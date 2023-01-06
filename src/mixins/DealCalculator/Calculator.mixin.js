import store from '@/store'
import hardcodedvalues from "@/enums/dealCalculator/hardcodedvalues";
import {required} from "vuelidate/lib/validators";
import {FUTURE} from "@/enums/dealCalculator/DealTypes";
import {FEES_TOTAL_AND_INSURANCE, FEES_LEGAL_AND_PRINCIPAL} from "@/enums/dealCalculator/Common";
import {ENDORSEMENT, MEDIA_RIGHTS, PLAYER_TRANSFER} from "@/enums/dealCalculator/ContractTypes";
import Calculator from "@/modules/Deal/Calculator";
import User from "@/modules/User/User";
import BorrowerTypes from "@/enums/modules/BorrowerType";
import RepositoryFactory from '@/repositories/RepositoryFactory';
import Utils from "../../services/utils";
const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
const DealRepository = RepositoryFactory.get('deal');

export default {
        data: function () {
            return {
                showSuccessMessage: false,
                totalPaymentsError: false,
                currentStep: 4,
                legalCost: hardcodedvalues.legalCost,
                insuranceExpense: hardcodedvalues.insuranceExpense,
                paymentEntries: [],
                interestRate: hardcodedvalues.interestRate,
                total: 0,
                grossTotal: 0,
                totalOfDeal: 0,
                costs: 0,
                interestChargeTotal: 0,
                underwritingFee: 0
            };
        },
        mounted() {
           this.interestRate = this.dealInterestRate();
        },
        validations() {
            return {
                paymentEntries: {
                    $each: {
                        paymentDate: {
                            required
                        },
                        paymentAmount: {
                            required
                        }
                    }
                }
            };
        },
        watch: {
            paymentEntries: {
                handler: function () {
                    this.$v.paymentEntries.$touch();
                },
            },

        },
        computed: {
            isCustomFrequency() {
                return this.info.frequency === 'custom'
            },
            feesTotalAndInsurance: () => {
                return FEES_TOTAL_AND_INSURANCE;
            },
            feesLegalAndPrincipal: () => {
                return FEES_LEGAL_AND_PRINCIPAL;
            },
            info: () => {
                return store.getters['dealCalculator/getStep3Info'];
            },
            featureDealType: () => {
                return FUTURE;
            },
            dealType: () => {
                return store.getters['dealCalculator/getDealType'];
            },
            isFeatureDeal() {
                return this.dealType === FUTURE;
            },
            contractType: () => {
                return store.getters['dealCalculator/getContractType'];
            },
            currency: () => {
                let currency = store.getters['dealCalculator/getStep3Info'].currency;
                switch (currency) {
                    case 'USD':
                        return '$';
                    case 'GBP':
                        return '£';
                    default:
                        return '€';
                }
            },
            installmentValue() {
                let info = store.getters["dealCalculator/getStep3Info"];

                return (
                    Utils.parseNum(info.netLoanAmount) +
                    Utils.parseNum(info.upfrontValue) +
                    this.getTotalFees()
                );
            },
            dealAmount: () => {
                // SEEMEk: code duplicated !!!
                let info = store.getters['dealCalculator/getStep3Info'];

                return (
                    Utils.parseNum(info.netLoanAmount)
                );
            },
            netLoanAmount: () => {
                let info = store.getters['dealCalculator/getStep3Info'];
                return Utils.parseNum(info.netLoanAmount);
            },
            nBDays: () => {
                let info = store.getters['dealCalculator/getStep3Info'];
                return parseInt(
                    Math.floor(
                        (Date.parse(info.fundingDate) - Date.parse(info.firstInstalment)) /
                        86400000
                    )
                );
            },
            paymentAmount: () => {
                let info = store.getters['dealCalculator/getStep3Info'];
                let netLoanAmount = Utils.parseNum(info.netLoanAmount);
                let upfrontValue = Utils.parseNum(info.upfrontValue);
                return (
                    (netLoanAmount + upfrontValue) /
                    info.numberOfInstalments
                ).toFixed(2);
            },
            autoPaymentAmount: () => {
                let info = store.getters['dealCalculator/getStep3Info'];
                let netLoanAmount = 0;
                if(typeof info.netLoanAmount === 'string') {
                    netLoanAmount = Utils.parseNum(info.netLoanAmount);
                }else {
                    netLoanAmount = info.netLoanAmount;
                }
                return Calculator.getLiveAutoPayment(netLoanAmount, info.numberOfInstalments);
            },
            interestRates: () => {
                return store.getters['dealCalculator/getInterestRates'];
            },
            isAvailableInsurance: () => {
                let info = store.getters['dealCalculator/getFirstStepInfo'];
                if ((info.contract_type == ENDORSEMENT) || (info.contract_type == MEDIA_RIGHTS) || (info.contract_type == PLAYER_TRANSFER)) {
                    return true;
                }

                return false;
            },
        },
        methods: {
            insuranceAmount() {
                if (!this.isAvailableInsurance) {
                    return 0;
                }

                // get number of years
                let nbYears = this.getNumberOfYears();
                // small hack
                if (nbYears > 5) {
                    nbYears = 5;
                }

                let insurance_percent = 0;
                if((this.interestRates['insurance'] != null) && (this.interestRates['insurance'][nbYears] != null)) {
                    insurance_percent = this.interestRates['insurance'][nbYears];
                }

                if(!insurance_percent){
                    return 0;
                }

                return parseFloat((this.netLoanAmount * insurance_percent) / 100);
            },
            getUnderwritingFee() {
                this.underwritingFee = Calculator.getUnderwritingFee(this.contractType, this.dealAmount);
            },
            getLegalCosts() {
                this.legalCost = Calculator.getLegalCosts(this.dealAmount);
            },
            dealInterestRate() {
                let nbYears = this.getNumberOfYears();
                // small hack
                if (nbYears > 5){
                    nbYears = 5;
                }

                if((this.interestRates['normal'] != null) && (this.interestRates['normal'][nbYears] != null)) {
                    return this.interestRates['normal'][nbYears];
                }

                return hardcodedvalues.interestRate;
            },
            getNumberOfYears() {
                let nb_installments = this.info.numberOfInstalments;
                switch (this.info.frequency) {
                    case 'monthly':
                        if (nb_installments <= 12)
                            return 1;
                        return parseInt(nb_installments / 12);

                    case 'quarterly':
                        if (nb_installments <= 4)
                            return 1;

                        return parseInt(nb_installments / 4);

                    case 'semianual':
                        if (nb_installments <= 2)
                            return 1;

                        return parseInt(nb_installments / 2);

                    case 'yearly':
                        return nb_installments;
                }
            },
            validateNbInstallments () {

            },
            getFeesAmount(feeType) {
                return Calculator.getFeesAmount(FUTURE, feeType, this.netLoanAmount)
            },
            getTotalFees() {
                let legal_fee  = this.getFeesAmount(FEES_LEGAL_AND_PRINCIPAL);
                return this.underwritingFee + legal_fee;
            },
            incrementValue(index) {
                switch (this.info.frequency) {
                    case 'monthly':
                        return {
                            increment: index,
                            frequency: 'months',
                        };
                    case 'quarterly':
                        return {
                            increment: index * 3,
                            frequency: 'months',
                        };
                    case 'semianual':
                        return {
                            increment: index * 6,
                            frequency: 'months',
                        };
                    case 'yearly':
                        return {
                            increment: index,
                            frequency: 'years',
                        };
                    default:
                        return '';
                }
            },
            async calculateRates() {
                let $this = this;
                if (this.isFeatureDeal) {
                    $this.calculateGrossTotal().then(() => {
                        $this.calculateTotal().then(() => {
                            $this.calculateTotalOfDeal();
                            this.getUnderwritingFee();
                            this.getLegalCosts();
                            // $this.checkIfTotal();
                        });
                    });
                } else {
                    this.updateGrossAmount().then(() => {
                        $this.calculateGrossTotal().then(() => {
                            $this.calculateTotal().then(() => {
                                $this.calculateTotalOfDeal();
                                this.getUnderwritingFee();
                                this.getLegalCosts();
                            });
                        });
                    });
                }
                this.calculateTimetable();
            },
            updateGrossAmount() {
                let $this = this;
                return new Promise(function (resolve, reject) {
                    // $this.paymentEntries.map((item) => {
                    //     item.grossAmount =
                    //         parseFloat(item.paymentAmount) + parseFloat(item.interestCharged);
                    // });
                    resolve(true);
                });
            },
            calculateTimetable() {
                let $this = this;
                this.paymentEntries.map((item) => {
                    // let interest = $this.calculateInterestCharged(
                    //     item.paymentDate,
                    //     item.paymentAmount
                    // );
                    item.interestPeriod = $this.getInterestPeriod(item.paymentDate);
                    // item.interestCharged = interest;
                    // item.grossAmount = Math.round(
                    //     parseFloat(item.paymentAmount) + interest
                    // );
                });
            },
            getInterestPeriod(paymentDate) {
                let diffTime = Math.abs(
                    Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
                );
                let diffDays = Math.ceil(diffTime / 86400000);
                return paymentDate !== ''
                    ? Number.parseFloat(diffDays / 365, 2).toFixed(1)
                    : 0;
            },
            getInterestPeriodMonths(paymentDate) {
                let diffTime = Math.abs(
                    Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
                );
                let diffDays = Math.ceil(diffTime / 86400000);
                return Math.ceil(diffDays / 30);
            },
            addPaymentEntry() {
                this.paymentEntries.push({
                    index: this.paymentEntries.length,
                    paymentDate: '',
                    paymentAmount: 0,
                    interestPeriod: 0,
                    interestCharged: 0,
                    grossAmount: 0,
                });
                this.$v.paymentEntries.$touch();
            },
            calculateTotal() {
                let $this = this;
                $this.total = 0;
                return new Promise(function (resolve, reject) {
                    Calculator.getTotal($this.paymentEntries, 'paymentAmount').then((result) => {
                        $this.total += result;
                    });
                    resolve(true);
                });
            },
            calculateGrossTotal() {
                let $this = this;
                return new Promise(function (resolve, reject) {
                    Calculator.getTotal($this.paymentEntries, 'grossAmount').then((result) => {
                        $this.grossTotal += result;
                    });
                    resolve(true);
                });
            },
            calculateCosts() {
                this.costs = 0;
                this.costs = (
                    (1.5 / 100) * parseFloat(this.info.contractValue) +
                    parseFloat(this.legalCost) +
                    parseFloat(this.insuranceExpense)
                ).toFixed(3);
            },
            async calculateInterestCharged(paymentDate, installmentAmount) {
                if (typeof paymentDate == 'undefined' || paymentDate === '') return 0;

                let diffTime = Math.abs(
                    Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
                );
                let diffDays = Math.ceil(diffTime / 86400000);

                let interest =
                    parseFloat(installmentAmount) /
                    Math.pow(1 - parseFloat(this.interestRate) / 100, diffDays / 365) -
                    1 -
                    parseFloat(installmentAmount);
                return Math.round(interest);
            },
            calculateInterestChargeTotal() {
                let $this = this;
                $this.interestChargeTotal = 0;
                return new Promise(function (resolve, reject) {
                    $this.paymentEntries.map((item) => {
                        $this.interestChargeTotal += parseFloat(item.interestCharged);
                    });
                    resolve(true);
                });
            },
            nextStep(stepNr) {
                this.$v.paymentEntries.$touch();
                if (!this.$v.paymentEntries.$invalid) {
                    store.dispatch('dealCalculator/addStep4Info', {
                        legalCost: this.legalCost,
                        insuranceExpense: this.insuranceExpense,
                        paymentEntries: this.paymentEntries,
                        interestRate: this.interestRate,
                        total: this.total,
                        grossTotal: this.grossTotal,
                        totalOfDeal: this.totalOfDeal,
                        costs: this.costs,
                    });
                    let $this = this;
                    let dealCalculatorState = store.getters['dealCalculator/getState'];
                    let data = this.prepareDealSubmitData();
                    data['click_save'] = 1;

                    if (dealCalculatorState.dealId === '') {
                        DealRepository.dealcalculatorSave(data)
                            .then((response) => {
                                store.dispatch('dealCalculator/dealId', response.data.id);
                                $this.$loading(false);
                            })
                            .catch((error) => {
                                console.error(error);
                                $this.$loading(false);
                            });
                    } else {
                        data['id'] = dealCalculatorState.dealId;
                        DealRepository.dealcalculatorUpdate(data)
                            .then((response) => {
                                $this.$loading(false);
                            })
                            .catch((error) => {
                                console.error(error);
                                $this.$loading(false);
                            });
                    }

                    if(stepNr) {
                        store.dispatch('dealCalculator/jumpToStep', stepNr);
                    }  else {
                        store.dispatch('dealCalculator/nextStep');
                    }

                }
            },
            saveLater() {
                this.$v.paymentEntries.$touch();
                if (!this.$v.paymentEntries.$invalid) {
                    store.dispatch('dealCalculator/addStep4Info', {
                        legalCost: this.legalCost,
                        insuranceExpense: this.insuranceExpense,
                        paymentEntries: this.paymentEntries,
                        interestRate: this.interestRate,
                        total: this.total,
                        grossTotal: this.grossTotal,
                        totalOfDeal: this.totalOfDeal,
                        costs: this.costs,
                    });

                    let $this = this;
                    let dealCalculatorState = store.getters['dealCalculator/getState'];
                    let data = this.prepareDealSubmitData();
                    data['click_save'] = 1;
                    this.$loading(true);

                    // add real user id
                    if (User.isAgent() && data['user_type'] === BorrowerTypes.ATHLETE)
                        data['user_id'] = data['athlete'].id;

                    DealRepository.dealcalculatorSave(data)
                        .then((response) => {
                            setTimeout(() => {
                                this.$loading(false);
                                $this.showSuccessMessage = true;
                                setTimeout(() => {
                                    store.dispatch('dealCalculator/resetDeal');
                                    $this.$router.push('/');
                                }, 1000);
                            }, 1000);
                        })
                        .catch((error) => {
                            console.error(error);
                            $this.$loading(false);
                        });
                }
            },
        },
        filters: {
            twoDecimals(number) {
                return number.toFixed(2);
            },
        },
}