export const addVoucherFormData = {
    codeVoucher: '',
    type: 1,
    discountValue: 0, // Giá trị mặc định là 0
    startDate: "",
    endDate: "",
    quantity: 0, // Giá trị mặc định là 0
    isActive: false,
    isGlobal: true, // Mặc định áp dụng cho tất cả sản phẩm
    productID: [] // Lưu danh sách ID sản phẩm nếu áp dụng cho một số sản phẩm
};

export const detailVoucherByID = {
    code:'',
    type:'',
    discountValue: 0,
    startDate:"",
    endDate:"",
    isActive:"",
    quantity:0,
    productMessage:'' ,
};
export const updateFMVoucherByID = {
    code: "",
    type: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
    isActive: false,
    isGlobal: true,
    quantity: 0,
    productId: [], // Mảng chứa ID sản phẩm
    productMessage: [] // Dùng để hiển thị trong UI
}