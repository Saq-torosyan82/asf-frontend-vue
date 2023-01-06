import store from '@/store'
export default {
    methods: {

        prevStep() {
            store.dispatch('dealCalculator/prevStep');
        }
    }
}