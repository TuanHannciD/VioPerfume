import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input,  } from 'reactstrap';

const AddBrand = ({ isOpen, toggle,close }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size="sm" className="modal-primary" >
            <ModalHeader toggle={toggle} close={close}  tag={"h1"}>
                Thêm nhãn hàng
            </ModalHeader>
            <ModalBody>
                <form>
                    <FormGroup>
                        <Label for="nameBrand">Tên nhãn hàng</Label>
                        <Input
                        type="text"
                        name="nameBR"
                        id="nameBrand"
                        placeholder="Nhập tên nhãn hàng"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="titleBR">Thông tin nhãn hàng</Label>
                        <Input
                        type="text"
                        name="title"
                        id="titleBR"
                        placeholder="Nhập mô tả về nhãn hàng ... "
                        autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descriptionBR">Giới thiệu nhãn hàng</Label>
                        <Input
                        type="text"
                        name="description"
                        id="descriptionBR"
                        placeholder="Nhập giới thệu về nhãn hàng ... "
                        autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" />{' '}
                        Xác nhận thêm nhãn hàng
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                        </Label>
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </ModalBody>   
        </Modal>
    );
}

export default AddBrand;