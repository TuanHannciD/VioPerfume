export const validateProductForm = (formData) => {
  const errors = {};
  
  if (!formData.namePD) errors.namePD = 'Tên sản phẩm là bắt buộc.';
  if (!formData.codePD) errors.codePD = 'Mã sản phẩm là bắt buộc.';
  if (!formData.select) errors.select = 'Thương hiệu là bắt buộc.';
  if (!formData.category) errors.category = 'Danh mục là bắt buộc.';
  if (!formData.price || formData.price <= 0) errors.price = 'Giá phải lớn hơn 0.';
  if (!formData.origin) errors.origin = 'Xuất xứ là bắt buộc.';
  if (!formData.capacity || formData.capacity <= 0) errors.capacity = 'Dung tích phải lớn hơn 0.';
  if (!formData.describe) errors.describe = 'Mô tả là bắt buộc.';
  if (!formData.fragrance) errors.fragrance = 'Nhóm hương là bắt buộc.';
  if (!formData.style) errors.style = 'Phong cách là bắt buộc.';
  if (!formData.image) errors.image = 'Ảnh là bắt buộc.';

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export const validateUpdateProductForm = (originalData, updatedData) => {
  const errors = {};
  let hasChanges = false;

  // Kiểm tra từng trường dữ liệu
  if (!updatedData.nameProducts) {
    errors.nameProducts = 'Tên sản phẩm là bắt buộc.';
  } else if (updatedData.nameProducts !== originalData.nameProducts) {
    hasChanges = true;
  }

  if (!updatedData.codeProducts) {
    errors.codeProducts = 'Mã sản phẩm là bắt buộc.'; 
  } else if (updatedData.codeProducts !== originalData.codeProducts) {
    hasChanges = true;
  }

  if (!updatedData.branch) {
    errors.branch = 'Thương hiệu là bắt buộc.';
  } else if (updatedData.branch !== originalData.branch) {
    hasChanges = true;
  }

  if (!updatedData.category) {
    errors.category = 'Danh mục là bắt buộc.';
  } else if (updatedData.category !== originalData.category) {
    hasChanges = true;
  }

  if (!updatedData.price || updatedData.price <= 0) {
    errors.price = 'Giá phải lớn hơn 0.';
  } else if (updatedData.price !== originalData.price) {
    hasChanges = true;
  }

  if (!updatedData.origin) {
    errors.origin = 'Xuất xứ là bắt buộc.';
  } else if (updatedData.origin !== originalData.origin) {
    hasChanges = true;
  }

  if (!updatedData.capacity || updatedData.capacity <= 0) {
    errors.capacity = 'Dung tích phải lớn hơn 0.';
  } else if (updatedData.capacity !== originalData.capacity) {
    hasChanges = true;
  }

  if (!updatedData.quantity || updatedData.quantity <= 0) {
    errors.quantity = 'Số lượng phải lớn hơn 0.'
  }

  if (!updatedData.capacity || updatedData.capacity <= 50) {
    errors.capacity = "Dung tích phải lớn hơn 50ml"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}; 