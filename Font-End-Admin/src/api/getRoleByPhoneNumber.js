import api from "./index";

export const getRoleByPhoneNumber = async (phoneNumber) => {
  try {
    const response = await api.get(`/api/Roles/GetUserInfoByPhoneNumber/${phoneNumber}`);
    return {
      userName: response.data.userName || "Không Tìm Thấy",
      currentRole: response.data.role ? response.data.role.join(", ") : "Không Tìm Thấy",
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return { userName: "Không Tìm Thấy", currentRole: "Không Tìm Thấy" };
  }
};
