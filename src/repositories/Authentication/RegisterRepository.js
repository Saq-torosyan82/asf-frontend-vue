import Client from "../Clients/AuthClient";

const resource = '/register';

export default {
    register(payload) {
        return Client.post(`${resource}`, payload);
    }
}