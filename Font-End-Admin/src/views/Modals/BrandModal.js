import { AddBranch, putUpdateBrand ,getBrandsById, delBrand} from 'api/apiBrands';
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, FormFeedback,ModalFooter } from 'reactstrap';
import { validateAddBrandForm,validateUpdateBrandForm } from '../../validations/brandValidations';
import { addBrandFormData,updateFormData, } from '../../constants/brandFormData';

export const AddBrand = ({ isOpen, toggle, close }) => {
    const [formData, setFormData] = useState(addBrandFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false); 

    // Hàm xử lý khi nhập dữ liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setIsConfirmed(e.target.checked); 
    };

    

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { errors: validationErrors, isValid } = validateAddBrandForm(formData);
        if (!isConfirmed) {
            alert('Vui lòng xác nhận trước khi thêm nhãn hàng!');
            return;
        }
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            // Gọi API thêm branch
            const response = await AddBranch(formData);
            setSuccessMessage(response.message); // Hiển thị thông báo thành công
            alert('Thêm nhãn hàng thành công!');
            setFormData(addBrandFormData); // Reset form
            toggle(); // Đóng modal
        } catch (error) {
            console.error('Error adding branch:', error);
            alert(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="sm" className="modal-primary">
            <ModalHeader toggle={toggle} close={close} tag="h1">
                Thêm nhãn hàng
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="nameBranch">Tên nhãn hàng</Label>
                        <Input
                            type="text"
                            name="nameBranch"
                            id="nameBranch"
                            placeholder="Nhập tên nhãn hàng"
                            value={formData.nameBranch}
                            onChange={handleInputChange}
                            invalid={!!errors.nameBranch}
                        />
                        <FormFeedback>{errors.nameBranch}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Thông tin nhãn hàng</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Nhập mô tả về nhãn hàng ..."
                            value={formData.title}
                            onChange={handleInputChange}
                            invalid={!!errors.title}
                        />
                        <FormFeedback>{errors.title}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Giới thiệu nhãn hàng</Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Nhập giới thiệu về nhãn hàng ..."
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </FormGroup>                
                    <FormGroup check>
                        <Label className="form-check-label">
                            <Input
                                className="form-check-input" 
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={handleCheckboxChange}
                            />{' '}
                            Xác nhận thêm nhãn hàng
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                    {successMessage && <p className="text-success">{successMessage}</p>}
                    <Button color="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang xử lý...' : 'Thêm nhãn hàng'}
                    </Button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export const BrandsDetailModal = ({ isOpen, toggle, close, branch, openEdit }) => {
    const [formData, setFormData] = useState(updateFormData);
    const [isEditing, setIsEditing] = useState(openEdit || false);
    const [errors, setErrors] = useState({});
    const [branchData, setBranchData] = useState({});

    useEffect(() => {
        const fetchBranchData = async () => {
            const branchData = await getBrandsById(branch.branchId);
            if (branchData) {
                setBranchData(branchData);
                setFormData({
                    nameBranch: branchData.nameBrand,
                    title: branchData.title,
                    description: branchData.description,
                });
            }
        };
        fetchBranchData();
    }, [branch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { errors: validationErrors, isValid } = validateUpdateBrandForm(formData);
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Gọi API cập nhật nhãn hàng
            const response = await putUpdateBrand(branchData.id, formData);
            console.log("Response:", response);
            alert('Cập nhật nhãn hàng thành công!');
            toggle(); // Đóng modal
        } catch (error) {
            console.error('Error updating branch:', error);
            alert('Có lỗi xảy ra khi cập nhật nhãn hàng.');
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-primary">
            <ModalHeader toggle={toggle} close={close}>
                {isEditing ? 'Chỉnh sửa nhãn hàng' : 'Chi tiết nhãn hàng'}
            </ModalHeader>
            <ModalBody>
                {isEditing ? (
                    <form>
                        <FormGroup>
                            <Label for="nameBranch">Tên nhãn hàng</Label>
                            <Input
                                type="text"
                                name="nameBranch"
                                id="nameBranch"
                                value={formData.nameBranch}
                                onChange={handleInputChange}
                                invalid={!!errors.nameBranch}
                            />
                            <FormFeedback>{errors.nameBranch}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Thông tin nhãn hàng</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                invalid={!!errors.title}
                            />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Giới thiệu nhãn hàng</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleUpdate}>
                            Cập nhật nhãn hàng
                        </Button>
                    </form>
                ) : (
                    <div>
                        <h4>ID: {branchData.id}</h4>
                        <h4>Tên: {branchData.nameBrand}</h4>
                        <h4>Thông tin: {branchData.title}</h4>
                        <h4>Giới thiệu: {branchData.description}</h4>
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Đóng
                </Button>
                <Button color="primary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export const BrandDeleteModal = ({ isOpen, toggle, close, brands,  }) => {
    const [loading, setLoading] = useState(false);
  
    // Xử lý khi modal mở và có sản phẩm để xóa
    useEffect(() => {
      if (brands && brands.branchId) {
        console.log('Đang mở modal xóa sản phẩm với ID:', brands.branchId);
      }
    }, [isOpen, brands]);
  
    const handleDeleteBrand = () => {
      if (!brands || !brands.branchId) {
        console.log('Không có ID nhãn hàng hoặc thông tin nhãn hàng');
        return;
      }
  
      setLoading(true);
      delBrand(brands.branchId)  // Giả sử delDeleteProduct là hàm xóa sản phẩm (có thể là API call)
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
            Xóa Nhãn Hàng
        </ModalHeader>
        <ModalBody>
          <p>Bạn có chắc chắn muốn xóa nhãn hàng này không?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Đóng
          </Button>
          <Button color="primary" onClick={handleDeleteBrand} disabled={loading}>
            {loading ? 'Đang xóa...' : 'Xóa Nhãn Hàng'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
