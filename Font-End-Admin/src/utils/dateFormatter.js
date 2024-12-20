// utils/dateFormatter.js

/**
 * Hàm định dạng ngày theo "dd/MM/yyyy HH:mm"
 * @param {string | Date} dateInput - Chuỗi ngày hoặc đối tượng Date
 * @returns {string} Ngày được định dạng
 */
export const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};
