import Common from "@/enums/dealCalculator/Common";
import {PPMT, PV} from '@formulajs/formulajs'
import {FUTURE, LIVE} from "@/enums/dealCalculator/DealTypes";
import { PLAYER_TRANSFER, ENDORSEMENT, AGENT_FEES, MEDIA_RIGHTS } from "../../enums/dealCalculator/ContractTypes";

const _MS_PER_DAY = 86400000;

export default {
    getRate(installment_type) {
        // SEEMEk: check if exists
        return Common.installments[installment_type]["rate"];
    },
    getPeriodFrequency(installment_type) {
        // SEEMEk: check if exists
        return Common.installments[installment_type]["freq"];
    },
    getTotal(entries, key) {
        let total = 0;
        let promise = new Promise(function (resolve, reject) {
            entries.map((item) => {
                total += parseFloat(item[key]);
            });
            resolve(total);
        });

        return promise;
    },
    getAllFeesValue(type) {
        let amount = 0;
        for (const key in Common.fees[type]) {
            amount += Common.fees[type][key]["percent"];
        }

        return amount;
    },
    // this method should be not used
    getFeesAmount(dealType, feeType, dealAmount) {

        let fees = [15000,20000,30000,35000,40000];
        let ranges = [1000000, 5000000, 10000000, 20000000, Infinity];

        return fees[ranges.findIndex(v => dealAmount <= v)];

    },
    getLegalCosts(dealAmount) {
        let fees = [15000,20000,30000,35000,40000];
        let ranges = [1000000, 5000000, 10000000, 20000000, Infinity];

        return fees[ranges.findIndex(v => dealAmount <= v)];
    },
    getUnderwritingFee(contractType, dealAmount) {
        let percentagesBasedOnContractType = {
            'player_transfer': 1.25,
            'endorsement': 2,
            'agent_fees': 2,
            'media_rights': 1.25,
            'player_advance': 2,
        }

        return percentagesBasedOnContractType[contractType] ? (percentagesBasedOnContractType[contractType] * dealAmount) / 100 : 0;
    },
    getGrossedPrincipalAmount(dealType, dealAmount) {
        let allFeesPercent = this.getAllFeesValue(dealType);

        return Math.round(dealAmount / ((100 - allFeesPercent) / 100), 2);
    },
    getTotalFeesAndCosts(dealType, dealAmount) {
        return this.getGrossedPrincipalAmount(dealType, dealAmount) - dealAmount;
    },
    getRepaymentPeriod(installment_type, nb_installments) {
        let installment = Common.installments[installment_type];
        return (nb_installments / installment.freq).toFixed(2);
    },
    getFutureDealPrincipal(installment_type, nb_installments, deal_amount, rate_nb, interestRate) {
        let deal_type = FUTURE;
        let installment = Common.installments[installment_type];
        let repayment_period = this.getRepaymentPeriod(installment_type, nb_installments);
        let grossed_principal = -this.getGrossedPrincipalAmount(deal_type, deal_amount);
        return PPMT(interestRate / installment.freq / 100, rate_nb, repayment_period * installment.freq, grossed_principal, 0, 0);
    },
    getFutureDealInterest(interestRate, prev_date, crt_date, balance) {
        let diffDays = this.diffDays(prev_date, crt_date);

        //SEEMEk: ignore daycount and consider = 1
        return (diffDays / 365) * interestRate / 100 * balance;
    },
    diffDays(start_date, end_date) {
        let utc_start = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
        let utc_end = Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());

        return Math.floor((utc_end - utc_start) / _MS_PER_DAY);
    },
    getLiveAutoPayment(net_amount, nb_installments) {
        return Math.round(net_amount / nb_installments);
    },
    getLiveDealPrincipal(installment_type, nb_installments, deal_amount, rate_nb,interest_rate) {
        let deal_type = LIVE;
        let installment = Common.installments[installment_type];
        let repayment_period = this.getRepaymentPeriod(installment_type, nb_installments);
        let discounted_value = this.getDiscountedLoanAmount(installment_type, nb_installments, deal_amount, interest_rate);
        return PPMT(interest_rate / installment.freq / 100, rate_nb, repayment_period * installment.freq, discounted_value, 0, 0);
    },
    getDiscountedLoanAmount(installment_type, nb_installments, net_amount, interest_rate) {
        let installment = Common.installments[installment_type];
        let repayment_period = this.getRepaymentPeriod(installment_type, nb_installments);
        let auto_payment = this.getLiveAutoPayment(net_amount, nb_installments);

        return -PV(interest_rate / installment.freq / 100, repayment_period * installment.freq, auto_payment, 0, 0);
    },
};

