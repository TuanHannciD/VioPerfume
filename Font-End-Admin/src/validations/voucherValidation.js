export const validationAddVoucherForm = (formData) => {
    const errors = {};

    if (!formData.codeVoucher) errors.codeVoucher = "Mã không được bỏ trống";
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) errors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
      };
}