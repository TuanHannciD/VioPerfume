export const validateAddBrandForm = (formData) => {
    const errors = {};
    if (!formData.nameBranch) errors.nameBranch = 'Tên nhãn hàng là bắt buộc';
    if (!formData.title) errors.title = 'Thông tin nhãn hàng là bắt buộc';
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
}; 

export const validateUpdateBrandForm = (formData) => {
    const errors = {};
    if (!formData.nameBranch) errors.nameBranch = 'Tên nhãn hàng là bắt buộc';
    if (!formData.title) errors.title = 'Thông tin nhãn hàng là bắt buộc';
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};