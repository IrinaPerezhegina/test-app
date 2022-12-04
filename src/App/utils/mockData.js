import { useState } from "react";
import httpService from "../service/http.service";

const useMockData = () => {
    const [error, setError] = useState(null);
    async function initialize(res) {
        try {
            await httpService.post("users/", res);
        } catch (error) {
            setError(error);
        }
    }
    async function getData() {
        try {
            const req = await httpService.get("users/");
            console.log(req);
            return req.data;
        } catch (error) {
            setError(error);
        }
    }

    return { error, initialize, getData };
};

export default useMockData;
