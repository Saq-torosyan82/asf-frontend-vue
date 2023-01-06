import Client from "../Clients/AuthClient";

const loginResource = '/clients/web/login';
const refreshTokenResource = '/clients/web/refresh';
const getResetPasswordEmailResource = '/password/forgot';
const passwordResetResource = '/password/reset';
const autoLoginResource = '/validate-login-token';
const magicLinkResource = '/magic-link';

export default {
    login(payload) {
        return Client.post(`${loginResource}`, payload);
    },
    refreshToken(payload) {
        return Client.get(`${refreshTokenResource}`, payload);
    },
    getResetPasswordEmail(payload) {
        return Client.post(`${getResetPasswordEmailResource}`, payload);
    },
    resetPassword(payload) {
        return Client.post(`${passwordResetResource}`, payload)
    },
    autoLogin(payload) {
        return Client.post(`${autoLoginResource}`, payload);
    },
    sendMagicLink(payload) {
        return Client.post(`${magicLinkResource}`, payload);
    }
}