import store from "@/store";
import RepositoryFactory from "@/repositories/RepositoryFactory";
const FinancialRepository = RepositoryFactory.get('financial');

export default {
    methods: {
        getFinancials() {
            FinancialRepository.getFinancials().then((response) => {
                store.dispatch('Financials/storeData', response.data);
                if(response.data.sports) {
                    store.commit('Financials/updateFilterSport', response.data.sports[0].id)
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }
}