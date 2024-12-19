import { AddBranch } from 'api/Brands';
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const AddBrand = ({ isOpen, toggle, close }) => {
    const [formData, setFormData] = useState({
        nameBranch: '',
        title: '',
        description: '',
    });
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

    

    // Kiểm tra hợp lệ form
    const validate = () => {
        const newErrors = {};
        if (!formData.nameBranch) newErrors.nameBranch = 'Tên nhãn hàng là bắt buộc';
        if (!formData.title) newErrors.title = 'Thông tin nhãn hàng là bắt buộc';
        return newErrors;
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (!isConfirmed) {
            alert('Vui lòng xác nhận trước khi thêm nhãn hàng!');
            return;
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (isConfirmed) {
            console.log('Form data submitted:', formData);
            // Gửi formData qua API hoặc xử lý logic khác
        }
        setErrors({});
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            // Gọi API thêm branch
            const response = await AddBranch(formData);
            setSuccessMessage(response.message); // Hiển thị thông báo thành công
            alert('Thêm nhãn hàng thành công!');
            setFormData({ nameBranch: '', title: '', description: '' }); // Reset form
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

export default AddBrand;
