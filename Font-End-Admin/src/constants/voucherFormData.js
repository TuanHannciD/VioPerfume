export const addVoucherFormData = {
    codeVoucher: '',
    type: 1,
    discountValue: 0, // Giá trị mặc định là 0
    startDate: null,
    endDate: null,
    quantity: 0, // Giá trị mặc định là 0
    isActive: false,
    isGlobal: true, // Mặc định áp dụng cho tất cả sản phẩm
    productID: [] // Lưu danh sách ID sản phẩm nếu áp dụng cho một số sản phẩm
};

export const detailVoucherByID = {
    code:'',
    type:'',
    discountValue: null,
    startDate:null,
    endDate:null,
    isActive:null,
    quantity:0,
    productMessage:'' 
};