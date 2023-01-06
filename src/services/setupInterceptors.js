import axiosInstance from "../repositories/Clients/AxiosClient";
import TokenService from "./token.service"
import RepositoryFactory from "../repositories/RepositoryFactory";
const AuthRepository = RepositoryFactory.get('authentification');

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                 config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/login" && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = AuthRepository.refreshToken({
                            refresh_token: TokenService.getLocalRefreshToken(),
                        });
                        const { user } = rs.data;
                        store.dispatch('auth/doLogin', user);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        store.dispatch('auth/loginFailures');
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;