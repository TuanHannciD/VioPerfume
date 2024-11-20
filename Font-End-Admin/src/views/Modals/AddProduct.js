import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const AddProduct = ({ isOpen, toggle,close }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-primary" >
            <ModalHeader toggle={toggle} close={close}  tag={"h1"}>
                Thêm sản phẩm
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="nameProduct">
                                    Tên sản phẩm
                                </Label>
                                <Input
                                    id="nameProduct"
                                    name="namePD"
                                    placeholder="Nhập tên sản phẩm ..."
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="codeProduct">
                                    Mã sản phẩm
                                </Label>
                                <Input
                                    id="codeProduct"
                                    name="codePD"
                                    placeholder="Nhập mã sản phẩm"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <Label for="selectInput">
                                    Thương hiệu
                                </Label><br />
                                <Input type="select" name="select" id="exampleSelect1" style={{ width: '100%', height: '100%' }}>
                                    <option>Dior</option>
                                    <option>Channel</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="priceProduct">Giá</Label>
                                <Input id="priceProduct" name="price" type="number" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="originProduct">Xuất xứ</Label>
                                <Input id="originProduct" name="origin" type="Text" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="capacityProduct">Dung tích</Label>
                                <Input id="capacityProduct" name="capacity" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="describePD">
                            Mô tả
                        </Label>
                        <Input
                            id="describePD"
                            name="describe"
                            placeholder="Mô tả về loại nước hoa ..."
                            type="textarea"
                            style={{ height: '10vh' }}
                        />
                    </FormGroup>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="fragrancePD">
                                    Nhóm hương
                                </Label>
                                <Input
                                    id="fragrancePD"
                                    name="fragrance"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="stylePD">
                                    Phong cách
                                </Label>
                                <Input
                                    id="stylePD"
                                    name="style"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup className="col-6">
                            <Label for="imagePD">
                                Ảnh
                            </Label>
                            <Input
                                id="imagePD"
                                name="image"
                                type="file"
                            />
                        </FormGroup>
                    </Row>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            Xác nhận thêm sản phẩm
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle} >
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddProduct;