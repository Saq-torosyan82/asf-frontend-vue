import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
    methods: {
        async disableUserAccount(id) {
            let $this = this;
            $this.$loading(true);
           await UserRepository.disableUserAccount(id)
                .then((response) => {
                    $this.$loading(false);
                })
                .catch((error) => {
                    console.error(error);
                    $this.$loading(false);
                });
        },
    },
};
