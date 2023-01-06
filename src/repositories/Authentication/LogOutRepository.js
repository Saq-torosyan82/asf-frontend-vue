import Client from "../Clients/AxiosClient";
const logoutResource = '/logout'

export default {
    logout() {
        return Client.delete(`${logoutResource}`);
    }
}