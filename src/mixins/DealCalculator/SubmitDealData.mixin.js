import store from "@/store"
export default {
    methods: {
        prepareDealSubmitData() {
            const dealCalculatorState = store.getters['dealCalculator/getState'];
            let data = {};
            if(dealCalculatorState.dealId !== '')
                Object.assign(data, {id: dealCalculatorState.dealId});

            Object.assign(data, dealCalculatorState.step1);
            Object.assign(data, dealCalculatorState.step1);
            Object.assign(data, dealCalculatorState.step2);
            Object.assign(data, dealCalculatorState.step3);
            Object.assign(data, dealCalculatorState.step4);
            Object.assign(data, dealCalculatorState.step6);
            Object.assign(data, dealCalculatorState.step7);

            return data;
        }
    }
}
