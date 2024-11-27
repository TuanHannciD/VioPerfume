import api from "./index";

export const login = async (credential) => {
    const response = await api.post('/login',credential);
    return response.data;
};
