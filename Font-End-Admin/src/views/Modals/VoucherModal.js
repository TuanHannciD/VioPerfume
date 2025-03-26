import { useEffect, useState } from "react";
import Select from 'react-select';
import { Modal, ModalBody, ModalHeader, Form, Row, Col, FormGroup, Label, Input, ModalFooter, Button, InputGroupText, InputGroup, FormFeedback } from "reactstrap";
import { customStyles } from '../../styles/selectStyles';
import ReactSwitch from "react-switch";
import { getAllProducts } from "api/apiProducts";
import { addVoucherFormData } from "constants/voucherFormData";
import { postAddVoucher } from "api/apiVouchers";
import { validationAddVoucherForm } from "validations/voucherValidation";
import { getVoucherByID } from "api/apiVouchers";

export const AddVoucher = ({ isOpen, toggle, close }) => {
  const [formData, setFormData] = useState(addVoucherFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const parseInputValue = (name, value) => {
    if (["discountValue", "quantity"].includes(name)) {
      return value === "" ? 0 : Number(value);
    }
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInputValue(name, value),
    }));
  };

  const handleDiscountTypeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, type: selectedOption.value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, isGlobal: checked, productID: [] }));
  };

  const handleProductsSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      productID: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  const validateForm = () => {
    const { errors, isValid } = validationAddVoucherForm(formData);
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form không hợp lệ:", errors); // Kiểm tra lỗi
      return;
    }
    setLoading(true);
    try {
      console.log("Data là :", formData)
      await postAddVoucher(formData);
      alert('Thêm voucher thành công!');
      toggle();  // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      alert('Có lỗi xảy ra khi thêm voucher.');
    }
    finally {
      setLoading(false);

    }
  };



  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-primary">
      <ModalHeader toggle={toggle} close={close} tag="h1">
        Thêm Voucher
        <h5 className="text-danger">
          *Mã là bắt buộc <br />
          Nếu bỏ trống, mặc định:<br />
          - Giá trị giảm là 1<br />
          - Số lượng là 1<br />
          - Ngày bắt đầu và kết thúc là ngày hôm nay<br />
        </h5>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="codeVoucher">Mã voucher</Label>
                <Input id="codeVoucher" name="codeVoucher" placeholder="Nhập mã voucher ..." type="text" value={formData.codeVoucher} onChange={handleInputChange} invalid={!!errors.codeVoucher} />
                <FormFeedback>{errors.codeVoucher}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="type">Loại giảm giá</Label>
                <Select
                  id="type"
                  value={{
                    value: formData.type,
                    label: formData.type === 0 ? "Phần trăm (%)" : "Số tiền cố định (VNĐ)"
                  }}
                  onChange={handleDiscountTypeChange}
                  options={[
                    { value: 0, label: "Phần trăm (%)" },
                    { value: 1, label: "Số tiền cố định (VNĐ)" }
                  ]}
                  isClearable={false}
                  styles={customStyles}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="discountValue">Giá trị giảm</Label>
                <InputGroup>
                  <Input id="discountValue" name="discountValue" type="number" value={formData.discountValue} onChange={handleInputChange} />
                  <InputGroupText>{formData.type === 0 ? "%" : "VNĐ"}</InputGroupText>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="quantity">Số lượng</Label>
                <Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="startDate">Ngày bắt đầu</Label>
                <Input id="startDate" name="startDate" type="datetime-local" value={formData.startDate} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="endDate">Ngày kết thúc</Label>
                <Input id="endDate" name="endDate" type="datetime-local" value={formData.endDate} onChange={handleInputChange} invalid={!!errors.endDate} />
                <FormFeedback>{errors.endDate}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="applyAllProducts">Áp dụng cho tất cả sản phẩm</Label>
                <br />
                <ReactSwitch
                  id="applyAllProducts"
                  checked={formData.isGlobal}
                  onChange={handleSwitchChange}
                  onColor="#00C851" offColor="#FF4444"
                  handleDiameter={20} uncheckedIcon={false}
                  checkedIcon={false} height={20} width={40} />
              </FormGroup>
              {!formData.isGlobal && (
                <FormGroup>
                  <Label for="selectProducts">Chọn sản phẩm</Label>
                  <Select id="selectProducts" isMulti options={products.map(product => ({ value: product.productsId, label: product.nameProducts }))} value={products.filter(p => formData.productID.includes(p.productsId)).map(p => ({ value: p.productsId, label: p.nameProducts }))} onChange={handleProductsSelectChange} placeholder="Chọn sản phẩm..." />
                </FormGroup>
              )}
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label id="active">Trạng thái kích hoạt</Label>
                <ReactSwitch
                  id="active" checked={formData.isActive}
                  onChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  handleDiameter={28}
                  offColor="#08f"
                  onColor="#0ff"
                  offHandleColor="#0ff"
                  onHandleColor="#08f"
                  height={40}
                  width={70}
                  borderRadius={6}
                  activeBoxShadow="0px 0px 1px 2px #fffc35"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "orange",
                        paddingRight: 2
                      }}
                    >
                      Off
                    </div>
                  }
                  checkedIcon={
                    <svg viewBox="0 0 10 10" height="100%" width="100%" fill="yellow">
                      <circle r={3} cx={5} cy={5} />
                    </svg>
                  }
                  uncheckedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 20
                      }}
                    >
                      😞
                    </div>
                  }
                  checkedHandleIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "red",
                        fontSize: 18
                      }}
                    >
                      😁
                    </div>
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Hủy</Button>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Đang thêm...' : 'Thêm Voucher'}</Button>
      </ModalFooter>
    </Modal>
  );
};

export const DetailVoucherByID = ({ isOpen, toggle, close, voucherID }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState({}); // Dữ liệu tạm khi chỉnh sửa

  const fields = [
    {label:"Mã Voucher",key:"code"},
    {label:"Loại Mã Giảm Giá",key:"type",isSelect:true},
    {label:"Giá Trị Giảm",key:"discountValue"},
    {label:"Số Lượng",key:"quantity"},
    {label:"Áp Dụng Tất Cả Sản Phẩm",key:"isGlobal",isGlobal:true},
    {label:"Sản Phẩm Áp Dụng",key:"productMessage"},
    {label:"Trạng Thái",key:"isActive",isSwitch:true},
    {label:"Ngày Bắt Đầu",key:"startDate",isDate:true},
    {label:"Ngày Kết Thúc",key:"endDate",isDate:true},
  ];
  const inputStyle = {
    border: isEditing ? "1px solid #ced4da" : "none",
    background: "transparent",
    padding: "10px",
    outline: "none",
    color: "#ced4da"
  };


  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const data = await getVoucherByID(voucherID);
        setFormData(data);
        setEditData(data);

        if (!data.isGlobal) {
          const productList = await getAllProducts();
          setProducts(productList);
        }
      } catch (error) {
        console.error("Lỗi khi lấy Voucher:", error);
      }
    };
    if (voucherID) fetchVoucher();
  }, [voucherID]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    setEditData(formData); // Quay lại dữ liệu gốc
    setIsEditing(false);
  };

  const groupedFields = [];
  for (let i = 0; i < fields.length; i+=2) {
    groupedFields.push(fields.slice(i,i+2));
    
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-primary">
      <ModalHeader toggle={toggle} close={close} tag={"h4"}>
        Chi tiết Voucher
        {isEditing ? (
          <Button color="danger" className="ml-3 mr-5" onClick={handleCancel}>
            Hủy chỉnh sửa
          </Button>
        ) : (
          <Button color="primary" className="ml-3 mr-5" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
        )}
      </ModalHeader>
      <ModalBody style={{ height: "calc(100vh - 400px)", overflowY: "auto" }}>
        {groupedFields.map((rowFields, rowIndex) => (
          <Row className="mb-3" key={rowIndex}>
            {rowFields.map((field, index) => (
              <Col md="6" key={index}>
                <Label>{field.label}</Label>
                {/* Nếu là select */}
                {field.isSelect ? (
                  isEditing ? (
                    <Select
                      options={[
                        { value: "Percentage", label: "Phần trăm (%)" },
                        { value: "FixedAmount", label: "Số tiền cố định (VNĐ)" },
                      ]}
                      value={{
                        value: editData.type,
                        label: editData.type === "Percentage" ? "Phần trăm (%)" : "Số tiền cố định (VNĐ)",
                      }}
                      onChange={(selectedOption) => setEditData({ ...editData, type: selectedOption.value })}
                    />
                  ) : (
                    <Input value={editData.type === "Percentage" ? "Phần trăm (%)" : "Số tiền cố định (VNĐ)"} style={inputStyle} />
                  )
                ) : field.isSwitch ? (
                  /* Nếu là Switch bật tắt */
                  <ReactSwitch
                    checked={editData.isActive}
                    disabled={!isEditing}
                    onChange={(checked) => setEditData({ ...editData, isActive: checked })}
                    onColor="#00C851"
                    offColor="#FF4444"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={40}
                  />
                ) : field.isDate ? (
                  /* Nếu là ngày */
                  <Input
                    name={field.key}
                    value={editData[field.key] || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    type="datetime-local"
                    style={inputStyle}
                  />
                ) : field.key === "isGlobal" ? (
                  /* Nếu là switch IsGlobal */
                  <ReactSwitch
                    checked={editData.isGlobal}
                    disabled={!isEditing}
                    onChange={(checked) => setEditData({ ...editData, isGlobal: checked })}
                    onColor="#00C851"
                    offColor="#FF4444"
                    handleDiameter={20}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={40}
                  />
                ) : field.key === "productMessage" ? (
                  /* Nếu là productMessage */
                  !isEditing ? (
                    <Input
                      value={
                        editData.isGlobal
                          ? "Áp dụng với tất cả sản phẩm"
                          : editData.productMessage?.map((vp) => `${vp.productName}`).join(", ") || "" 
                      }
                      disabled
                      style={inputStyle}
                    />
                  ) : (
                    <Select
                      isMulti
                      // Chuyển danh sách products thành mảng { value: id, label: nameProducts }
                      options={products.map((p) => ({ value: p.id, label: p.nameProducts }))}

                      // Gán giá trị đã chọn, chuyển từ editData.productMessage sang dạng { value, label }
                      value={editData.productMessage?.map((vp) => ({
                        value: vp.productId, // ID sản phẩm
                        label: vp.productName, // Tên sản phẩm
                      })) || []} // Nếu không có giá trị nào, trả về mảng rỗng []

                      // Khi người dùng chọn hoặc bỏ chọn sản phẩm
                      onChange={(selected) => {
                        setEditData({
                          ...editData, // Giữ nguyên các dữ liệu khác của editData
                          productMessage: selected.map((s) => ({
                            productId: s.value, // Gán lại ID sản phẩm
                            productName: s.label, // Gán lại tên sản phẩm
                          })),
                        });
                      }}
                    />
                  )
                ) : (
                  /* Input thông thường */
                  <Input
                    name={field.key}
                    value={editData[field.key] || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={inputStyle}
                  />
                )}
              </Col>
            ))}
          </Row>
        ))}
      </ModalBody>
  
      <ModalFooter className="d-flex justify-content-between w-100">
        {isEditing && (
          <Button color="success" onClick={() => setIsEditing(false)}>
            Lưu
          </Button>
        )}
        <Button onClick={toggle}>Đóng</Button>
      </ModalFooter>
    </Modal>
  );
  
  
};

