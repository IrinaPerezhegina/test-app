import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

// export const usersEndpoint = "users/";

axios.defaults.baseURL =
    "https://test-app-ae57e-default-rtdb.europe-west1.firebasedatabase.app/";

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            console.log(config.url);
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}
axios.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            transformData(res.data);
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            toast.error("Something was wrong. Try it later ");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
