import store from "@/store";
import RepositoryFactory from "../../repositories/RepositoryFactory";
const FinancialRepository = RepositoryFactory.get('financial');

export default {
    computed: {
        documents: {
            get() {
                return store.getters['Financials/getDocuments'];
            },
            set(data) {
                store.dispatch('Financials/storeDocuments', data);
            },
        },
        documentsStatuses() {
            return store.getters['Financials/getDocumentsStatuses'];
        },
        clubId() {
            return store.getters['Financials/getFilterClub'];
        }
    } ,
    data() {
        return {
            rejectDocumentsModal: false,
            isRejectedDocument : false,
            form: {
                reason: '',
            },
            data: {}
        }
    },
    methods: {
        getDocuments(id) {
            let $this = this;
            FinancialRepository.getClubDocuments(id).then((response) => {
                store.dispatch('Financials/storeDocuments', response.data);
            }).catch((error) => {
                $this.documents = [];
                store.dispatch('Financials/storeDocuments', []);
                console.error(error);
            })
        },
        changeStatus(data) {
            let $this = this;

            $this.$loading(true);
            if ($this.isRejectedDocument === true) {
                $this.rejectDocumentsModal = true;
                $this.$loading(false);
            } else {
                FinancialRepository.changeDocumentsStatus(data).then((response)=> {
                    $this.getDocuments($this.clubId);
                    $this.$loading(false);
                }).catch((error) => {
                    console.error(error);
                    $this.$loading(false);
                })
            }
        },
    }
}