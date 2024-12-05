import api from "./index";

export const register = async (credential) => {
    const response = await api.post('/register',credential);
    return response.data;
};
