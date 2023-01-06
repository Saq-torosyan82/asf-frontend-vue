import store from '@/store'
import RepositoryFactory from "../../repositories/RepositoryFactory";
import GetDealDetailMixin from "@/mixins/Deal/GetDealDetail.mixin"
const DealRepository = RepositoryFactory.get("deal");

const STATUS_UNDER_REVIEW = 'under-review';
const STATUS_APPROVE_DOCUMENTS = 'approve-documents';

export default {
    data() {
        return {
            rejectDocumentsModal: false,
        };
    },
    mixins: [GetDealDetailMixin],
    computed: {
        dealId: () => {
            return store.getters["dealDetail/getDealId"];
        },
    },
    methods: {
        acceptDocuments() {
            let $this = this;
            $this.$loading(true);
            DealRepository.updateDealStatus(this.dealId, STATUS_APPROVE_DOCUMENTS, {})
                .then((response) => {
                    $this.$loading(false);
                    $this.getDealDetail(this.dealId);
                    store.dispatch("dealDetail/updateDealFlag", true);
                })
                .catch((error) => {
                    $this.$loading(false);
                    console.error(error);
                });
        },
        underReviewDocuments() {
            let $this = this;
            $this.$loading(true);
            DealRepository.updateDealStatus(this.dealId, STATUS_UNDER_REVIEW, {})
                .then((response) => {
                    $this.$loading(false);
                    $this.getDealDetail(this.dealId);
                    store.dispatch("dealDetail/updateDealFlag", true);
                })
                .catch((error) => {
                    $this.$loading(false);
                    console.error(error);
                });
        },
        rejectDocuments() {
            this.rejectDocumentsModal = true;
        },
    }
}