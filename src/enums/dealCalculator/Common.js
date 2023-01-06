import {FUTURE, LIVE} from "@/enums/dealCalculator/DealTypes";

export const INTEREST_FREQ_MONTHLY = "monthly";
export const INTEREST_FREQ_QUARTERLY = "quarterly";
export const INTEREST_FREQ_SEMIANUAL = "semianual";
export const INTEREST_FREQ_YEARLY = "yearly";
export const INTEREST_FREQ_CUSTOM = "custom";

export const BUYING = "buying";
export const SELLING = "selling";

export const FEES_TOTAL_AND_INSURANCE = "total_insurance";
export const FEES_LEGAL_AND_PRINCIPAL = "legal_principal";

export default Object.freeze({
    "installments": {
        [INTEREST_FREQ_MONTHLY]: {
            "rate": 6.7850,
            "is_custom": 0,
            "freq": 12
        },
        [INTEREST_FREQ_QUARTERLY]: {
            "rate": 6.8234,
            "is_custom": 0,
            "freq": 4
        },
        [INTEREST_FREQ_SEMIANUAL]: {
            "rate": 6.8816,
            "is_custom": 0,
            "freq": 2
        },
        [INTEREST_FREQ_YEARLY]: {
            "rate": 7.0000,
            "is_custom": 0,
            "freq": 1
        },
        [INTEREST_FREQ_CUSTOM]: {
            "rate": 7.0000,
            "is_custom": 1
        }
    },
    "fees": {
        [FUTURE]: {
            [FEES_TOTAL_AND_INSURANCE]: {
                "label": "Total Fees & Insurance",
                "percent": 2
            },
            [FEES_LEGAL_AND_PRINCIPAL]:
                {
                    "label": "Legal Fee % Principal",
                    "percent": 0.6
                }
        },
        [LIVE]: {
            [FEES_TOTAL_AND_INSURANCE]: {
                "label": "Total Fees & Insurance",
                "percent": 2
            },
            // [FEES_LEGAL_AND_PRINCIPAL]:
            //     {
            //         "label": "Legal Fee % Principal",
            //         "percent": 0.2
            //     }
        }
    }
})
;