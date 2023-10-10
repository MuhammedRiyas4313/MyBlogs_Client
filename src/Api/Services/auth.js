import { AxiosURL } from "./../baseUrl.js";

export const LoginAPI = async (data) => {
    try {
        const response = await AxiosURL.post("/login", data);
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};

export const RegisterAPI = async (data) => {
    console.log('register user',data)
    try {
        const response = await AxiosURL.post("/register", data);
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};
