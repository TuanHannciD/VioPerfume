import { getAllProductCategorys } from 'api/apiProductCategorys';
import { getAllBrands } from 'api/apiBrands';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';  // Import react-select
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Form, FormGroup, Label, Input, Row, Col, FormFeedback
} from 'reactstrap';
import ReactSwitch from 'react-switch';
import {postAddProducts, putUpdateProducts, delDeleteProduct,getByIDProducts } from 'api/apiProducts';
import { customStyles } from '../../styles/selectStyles';
import { addProductFormData, productDetailFormData } from '../../constants/initialFormData';
import { validateProductForm , validateUpdateProductForm} from '../../validations/productValidations';


export const AddProduct = ({ isOpen, toggle, close }) => {
  const [formData, setFormData] = useState(addProductFormData);

  const [brands, setBrands] = useState([]); // Lưu trữ danh sách thương hiệu
  const [categories, setCategories] = useState([]); // Lưu trữ danh mục sản phẩm
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Gọi API để lấy danh sách thương hiệu và danh mục khi modal mở
    const fetchBrandsAndCategories = async () => {
      try {
        const brandData = await getAllBrands();
        const categoryData = await getAllProductCategorys(); // Lấy danh mục sản phẩm
        setBrands(brandData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (isOpen) fetchBrandsAndCategories();
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSelectChange = (selectedOption, field) => {
    console.log("Selected Option:", selectedOption);
    setFormData({ ...formData, [field]: selectedOption ? selectedOption.value : '' });
  };

  const validateForm = () => {
    const { errors, isValid } = validateProductForm(formData);
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
      const response = await postAddProducts(formData);
      console.log('Response:', response);
      alert('Thêm sản phẩm thành công!');
      toggle(); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi thêm sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-primary">
      <ModalHeader toggle={toggle} close={close} tag="h1">
        Thêm sản phẩm
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="nameProduct">Tên sản phẩm</Label>
                <Input
                  id="nameProduct"
                  name="namePD"
                  placeholder="Nhập tên sản phẩm ..."
                  type="text"
                  value={formData.namePD}
                  onChange={handleInputChange}
                  invalid={!!errors.namePD}
                />
                <FormFeedback>{errors.namePD}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="codeProduct">Mã sản phẩm</Label>
                <Input
                  id="codeProduct"
                  name="codePD"
                  placeholder="Nhập mã sản phẩm"
                  type="text"
                  value={formData.codePD}
                  onChange={handleInputChange}
                  invalid={!!errors.codePD}
                />
                <FormFeedback>{errors.codePD}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6" >
              <FormGroup>
                <Label for="selectInput">Thương hiệu</Label>
                <Select
                  id="selectInput"
                  value={
                    brands.map(brand => ({ value: brand.branchId, label: brand.branchName }))
                      .find(option => option.value === formData.select) || null
                  }
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'select')}
                  options={brands.map(brand => ({ value: brand.branchId, label: brand.branchName }))}
                  isClearable
                  styles={customStyles}
                  placeholder="Chọn thương hiệu"
                />
                {errors.select && <div className="invalid-feedback">{errors.select}</div>}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="categoryInput">Danh mục</Label>
                <Select
                  id="categoryInput"
                  value={categories.map(category => ({ value: category.id, label: category.name }))
                  .find(option => option.value === formData.category) || ''}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'category')}
                  options={categories.map(category => ({ value: category.id, label: category.name }))}
                  isClearable
                  styles={customStyles}
                  placeholder="Chọn danh mục"
                />
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="priceProduct">Giá</Label>
                <Input
                  id="priceProduct"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  invalid={!!errors.price}
                />
                <FormFeedback>{errors.price}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="originProduct">Xuất xứ</Label>
                <Input
                  id="originProduct"
                  name="origin"
                  type="text"
                  value={formData.origin}
                  onChange={handleInputChange}
                  invalid={!!errors.origin}
                />
                <FormFeedback>{errors.origin}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="capacityProduct">Dung tích</Label>
                <Input
                  id="capacityProduct"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  invalid={!!errors.capacity}
                />
                <FormFeedback>{errors.capacity}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="describePD">Mô tả</Label>
            <Input
              id="describePD"
              name="describe"
              placeholder="Mô tả về loại nước hoa ..."
              type="textarea"
              value={formData.describe}
              onChange={handleInputChange}
              invalid={!!errors.describe}
              style={{ height: '10vh' }}
            />
            <FormFeedback>{errors.describe}</FormFeedback>
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="fragrancePD">Nhóm hương</Label>
                <Input
                  id="fragrancePD"
                  name="fragrance"
                  type="text"
                  value={formData.fragrance}
                  onChange={handleInputChange}
                  invalid={!!errors.fragrance}
                />
                <FormFeedback>{errors.fragrance}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="stylePD">Phong cách</Label>
                <Input
                  id="stylePD"
                  name="style"
                  type="text"
                  value={formData.style}
                  onChange={handleInputChange}
                  invalid={!!errors.style}
                />
                <FormFeedback>{errors.style}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="imageUpload">Ảnh sản phẩm</Label>
            <Input
              type="file"
              id="imageUpload"
              onChange={handleFileChange}
              invalid={!!errors.image}
            />
            <FormFeedback>{errors.image}</FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Hủy</Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const ProductsDetailModal = ({ isOpen, toggle, close, products, openEdit }) => {
  const [formData, setFormData] = useState(productDetailFormData);
  const [detailProducts, setDetailProducts] = useState(null);
  const [isEditing, setIsEditing] = useState(openEdit || false);
  const [newImage, setNewImage] = useState(null); // State để lưu trữ hình ảnh mới
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]); // Lưu trữ danh mục sản phẩm
  const [errors, setErrors] = useState({});

  // Fetch product data khi modal mở
  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const brandData = await getAllBrands();
        const categoryData = await getAllProductCategorys(); // Lấy danh mục sản phẩm
        setBrands(brandData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) fetchBrandsAndCategories();

    const fetchData = async () => {
      if (products && products.productsId) {
        try {
          const data = await getByIDProducts(products.productsId);
          setDetailProducts(data);
          setFormData({
            nameProducts: data.nameProducts || '',
            codeProducts: data.codeProductsPD || '',
            description: data.descriptionPD || '',
            origin: data.originPD || '',
            capacity: data.capacityPD || 0,
            quantity: data.quantityPD || 0,
            fragranceGroup: data.fragranceGroupPD || '',
            style: data.stylePD || '',
            price: data.pricePD || 0,
            priceSale: data.isSalePD || 0,
            isHome: data.isHomePD || false,
            isSale: data.isSalePD || false,
            isFeature: data.isFeaturePD || false,
            isHot: data.isHotPD || false,
            productCategorysId: data.productCategorysIdPD || '',
            brandId: data.brandIdPD || '',
            createBy: data.creatByPD,
            createDate: data.creatDatePD,
          });
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, products]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption ? selectedOption.value : null // Cập nhật giá trị cho `branch` hoặc xóa nếu bỏ chọn
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Lưu trữ file hình ảnh thay vì URL tạm thời
      setFormData({ ...formData, image: file }); // Cập nhật hình ảnh vào formData  
    }
  };

  const handleUpdate = () => {
    const { errors, isValid } = validateUpdateProductForm(detailProducts, formData);
    setErrors(errors);
    if (!isValid) {
      console.log("Form không hợp lệ:", errors);
      return;
    }
    const updatedProduct = { ...formData, imagePath: newImage || detailProducts.imagePD };
    console.log("Dữ liệu gửi đi:", updatedProduct);

    putUpdateProducts(detailProducts.productsId, updatedProduct)
      .then(() => {
        alert("Cập nhật sản phẩm thành công");
        toggle();
      })
      .catch((error) => {
        console.error("Cập nhật thất bại:", error);
        alert("Có lỗi xảy ra khi cập nhật sản phẩm");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-lg"
      style={{ maxWidth: '100%', width: '100%', height: '100vh', margin: 0, padding: 0, transform: "none" }}
    >
      <ModalHeader toggle={toggle} close={close}>
        <div className="d-flex justify-content-start w-100">
          <Button
            color="primary"
            onClick={() => setIsEditing((prev) => !prev)}
            className="mr-5"
          >
            {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
          </Button>
          <h3 className="blockquote blockquote-primary mb-0">Chi tiết sản phẩm</h3>
        </div>
      </ModalHeader>
      <ModalBody style={{ height: 'calc(90vh - 56px)', overflowY: 'auto' }}>
        {detailProducts ? (
          <Row>
            <Col md="4">
              <div className="text-center">
                {/* Hiển thị ảnh sản phẩm hoặc ảnh mới nếu đang chỉnh sửa */}
                <img
                  src={newImage ? URL.createObjectURL(newImage) : detailProducts.imagePD}
                  alt={detailProducts.nameProducts}
                  style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
                {isEditing && (
                  <div className="mt-3">
                    <label className="btn btn-primary">
                      Chọn hình ảnh
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </Col>
            <Col md="4">
              <div className='blockquote blockquote-primary'>
                <h4>Thông tin cơ bản</h4>
                <div><strong>Tên:</strong>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="nameProducts"
                      value={formData.nameProducts}
                      onChange={handleInputChange}
                      invalid={!!errors.nameProducts}
                    />
                  ) : detailProducts.nameProducts}
                  {errors.nameProducts && <FormFeedback>{errors.nameProducts}</FormFeedback>}
                </div>

                <div><strong>Mã sản phẩm:</strong>
                  {isEditing ? (
                    <Input
                      type="text"
                      name="codeProducts"
                      value={formData.codeProducts}
                      onChange={handleInputChange}
                      invalid={!!errors.codeProducts}
                    />
                  ) : detailProducts.codeProductsPD}
                  {errors.codeProducts && <FormFeedback>{errors.codeProducts}</FormFeedback>}
                </div>
                <div>
                  <strong>Mô tả:</strong>
                  {isEditing ?
                    <Input
                      type="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    /> : detailProducts.descriptionPD}
                </div>

                <div><strong>Xuất xứ:</strong>
                  {isEditing ?
                    <Input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                    /> : detailProducts.originPD}
                </div>

                <div>
                  <strong>Nhãn hàng:</strong>
                  {isEditing ? (
                    <div>
                      <Select
                        id="selectInput"
                        value={
                          brands
                            .map((brand) => ({ value: brand.branchId, label: brand.branchName }))
                            .find((option) => option.value === formData.branch) || null
                        }
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'branch')}
                        options={brands.map((brand) => ({ value: brand.branchId, label: brand.branchName }))}
                        isClearable
                        styles={customStyles}
                        placeholder="Chọn thương hiệu"
                      />
                      {errors.branch && (
                        <div style={{ color: 'yellow', marginTop: '4px' }}>{errors.branch}</div>
                      )}
                    </div>
                  ) : (
                    detailProducts.brandName || "Không xác định"
                  )}
                </div>

                <div>
                  <strong>Danh mục sản phẩm:</strong>
                  {isEditing ? (
                    <div>
                      <Select
                        id="categoryInput"
                        value={
                          categories
                            .map((category) => ({ value: category.id, label: category.name }))
                            .find((option) => option.value === formData.category) || ''
                        }
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'category')}
                        options={categories.map((category) => ({ value: category.id, label: category.name }))}
                        isClearable
                        styles={customStyles}
                        placeholder="Chọn danh mục"
                      />
                      {errors.category && (
                        <div style={{ color: 'yellow', marginTop: '4px' }}>{errors.category}</div>
                      )}
                    </div>
                  ) : (
                    detailProducts.productCategorysName || 'Không xác định'
                  )}
                </div>

              </div>
              <div className='blockquote blockquote-primary'>
                <h4>Giá cả</h4>
                <div>
                  <strong>Giá:</strong>
                  {isEditing ?
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      invalid={errors.price}
                    />
                    : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailProducts.pricePD)}
                  <FormFeedback>{errors.price}</FormFeedback>
                </div>
                <div>
                  <strong>Giá Sale:</strong>
                  {isEditing ?
                    <Input
                      type="number"
                      name="priceSale"
                      value={formData.priceSale}
                      onChange={handleInputChange}
                    />
                    : (detailProducts.priceSale ?
                      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailProducts.priceSalePD) : 'Không có')}
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className='blockquote blockquote-primary'>
                <h4>Chi tiết sản phẩm</h4>
                <div>
                  <strong>Số Lượng:</strong>
                  {isEditing ?
                    <Input type='number'
                      name='quantity'
                      value={formData.quantity}
                      onChange={handleInputChange}
                      invalid={!!errors.quantity}
                    />
                    : `${detailProducts.quantityPD}`}
                  <FormFeedback>{errors.quantity}</FormFeedback>
                </div>
                <div>
                  <strong>Dung tích:</strong>
                  {isEditing ?
                    <Input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      invalid={!!errors.capacity}
                    />
                    : `${detailProducts.capacityPD} ml`}
                  <FormFeedback>{errors.capacity}</FormFeedback>
                </div>

                <div>
                  <strong>Nhóm hương:</strong>
                  {isEditing ?
                    <Input
                      type="text"
                      name="fragranceGroup"
                      value={formData.fragranceGroup}
                      onChange={handleInputChange}
                    />
                    : detailProducts.fragranceGroupPD}
                </div>
                <div>
                  <strong>Phong cách:</strong>
                  {isEditing ?
                    <Input
                      type="text"
                      name="style"
                      value={formData.style}
                      onChange={handleInputChange}
                    />
                    : detailProducts.stylePD}
                </div>
              </div>
              <div className="blockquote blockquote-primary">
                <h4>Trạng thái</h4>
                <div className="d-flex align-items-center mb-2">
                  <label className="mr-2 mt-2">
                    <strong>Hiển thị tại trang chủ:</strong>
                  </label>
                  {isEditing ? (
                    <ReactSwitch
                      onChange={(checked) => handleInputChange({ target: { name: "isHome", type: "checkbox", checked } })}
                      checked={formData.isHome}
                      height={20}
                      width={40}
                      onColor="#0d6efd"
                      offColor="#ccc"
                    />
                  ) : (
                    <span>{detailProducts.isHomePD ? "Có" : "Không"}</span>
                  )}
                </div>

                <div className="d-flex align-items-center mb-2">
                  <label className="mr-2 mt-2">
                    <strong>Trạng thái Sale:</strong>
                  </label>
                  {isEditing ? (
                    <ReactSwitch
                      onChange={(checked) => handleInputChange({ target: { name: "isSale", type: "checkbox", checked } })}
                      checked={formData.isSale}
                      height={20}
                      width={40}
                      onColor="#28a745"
                      offColor="#ccc"
                    />
                  ) : (
                    <span className="ml-2">{detailProducts.isSalePD ? "Có" : "Không"}</span>
                  )}
                </div>

                <div className="d-flex align-items-center mb-2">
                  <label className="mr-2 mt-2">
                    <strong>Trạng thái Feature:</strong>
                  </label>
                  {isEditing ? (
                    <ReactSwitch
                      onChange={(checked) => handleInputChange({ target: { name: "isFeature", type: "checkbox", checked } })}
                      checked={formData.isFeature}
                      height={20}
                      width={40}
                      onColor="#ffc107"
                      offColor="#ccc"
                    />
                  ) : (
                    <span className="ml-2">{detailProducts.isFeaturePD ? "Có" : "Không"}</span>
                  )}
                </div>

                <div className="d-flex align-items-center mb-2">
                  <label className="mr-2 mt-2">
                    <strong>Trạng thái Hot:</strong>
                  </label>
                  {isEditing ? (
                    <ReactSwitch
                      onChange={(checked) => handleInputChange({ target: { name: "isHot", type: "checkbox", checked } })}
                      checked={formData.isHot}
                      height={20}
                      width={40}
                      onColor="#dc3545"
                      offColor="#ccc"
                    />
                  ) : (
                    <span className="ml-2">{detailProducts.isHotPD ? "Có" : "Không"}</span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            <p>Không có thông tin để hiển thị.</p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {isEditing && (
          <Button color="primary" onClick={handleUpdate}>
            Cập nhật sản phẩm
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const ProductsDeleteModal = ({ isOpen, toggle, close, products,  }) => {
  const [loading, setLoading] = useState(false);

  // Xử lý khi modal mở và có sản phẩm để xóa
  useEffect(() => {
    if (isOpen && products && products.productsId) {
      console.log('Đang mở modal xóa sản phẩm với ID:', products.productsId);
    }
  }, [isOpen, products]);

  const handleDeleteProduct = () => {
    if (!products || !products.productsId) {
      console.log('Không có ID sản phẩm hoặc thông tin sản phẩm');
      return;
    }

    setLoading(true);
    delDeleteProduct(products.productsId)  // Giả sử delDeleteProduct là hàm xóa sản phẩm (có thể là API call)
      .then(() => {
        console.log('Sản phẩm đã bị xóa thành công');
        toggle(); // Đóng modal sau khi xóa thành công
      })
      .catch((error) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      })
      .finally(() => {
        setLoading(false);  // Đặt lại trạng thái loading khi kết thúc
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} close={close}>
          Xóa Sản Phẩm
      </ModalHeader>
      <ModalBody>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
        <Button color="primary" onClick={handleDeleteProduct} disabled={loading}>
          {loading ? 'Đang xóa...' : 'Xóa Sản Phẩm'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};




