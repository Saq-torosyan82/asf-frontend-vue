import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
    data() {
        return {
            confirmModal: false,
            userId: ''
        }
    },
    methods: {
        showConfirmModal(userId) {
            this.confirmModal = true;
            this.userId = userId;
        },
        closeConfirmModal() {
            this.confirmModal = false;
            this.userId = '';
        },
        deleteUser() {
            let $this = this;
            if(this.userId !== '') {
                $this.$loading(true);
                UserRepository.delete(this.userId).then((response) => {
                    $this.getUsers();
                    $this.confirmModal = false;
                    $this.$loading(false);
                }).catch((error) => {
                    console.error(error);
                    $this.$loading(false);
                    $this.confirmModal = false;
                });
            }
        },

    },
};
