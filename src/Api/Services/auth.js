import { AxiosURL } from "./../baseUrl.js";

export const LoginAPI = async (data) => {
        const response = await AxiosURL.post("/login", data);
        return response;
};

export const RegisterAPI = async (data) => {
   
        const response = await AxiosURL.post("/register", data);
        return response;
};
