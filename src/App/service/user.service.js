import httpService from "./http.service";

const userService = {
    get: async () => {
        const { data } = await httpService.get("users/");
        return data.content;
    }
};

export default userService;
