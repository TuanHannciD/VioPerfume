import api from "./index";

export const changeRole = async (credential) => {
    const response = await api.post('api/Roles/UpdateRoleByNumberPhone',credential);
    return response.data;
}