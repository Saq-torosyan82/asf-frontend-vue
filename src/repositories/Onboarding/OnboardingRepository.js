import Client from "../Clients/AxiosClient";

const saveResource = '/onboarding';
const registerLenderResource = '/lender';
const borrowerResource = '/borrower';
const checkOrganisationResource = '/users/check-organisation';

export default {
    saveBorrower(payload) {
        return Client.post(`${saveResource}${borrowerResource}`, payload);
    },
    registerLender(payload) {
        return Client.post(`${saveResource}${registerLenderResource}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    checkOrganisation(payload) {
        return Client.post(`${checkOrganisationResource}`, payload);
    },
}