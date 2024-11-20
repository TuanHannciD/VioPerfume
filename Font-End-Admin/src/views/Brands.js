import React, { useState } from "react";
// reactstrap components
import {
    Card, Table, CardHeader, CardBody, CardTitle, Row, Col,
    Button, Modal, ModalBody, ModalFooter, ModalHeader, Input,
    Label, Form, FormGroup, 
} from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";
import AddProduct from "./Modals/AddProduct";
import AddBrand from "./Modals/AddBrands";


const Brands = () => {
    const [modelProduct, setModalProduct] = useState(false);
    const [modelBrand,setModalBrand] = useState(false);
    const toggleModalProduct = () => {
        setModalProduct(!modelProduct);
    };  
    const toggleModalBrand = () => {
        setModalBrand(!modelBrand);
    };
    const closeBtn = (
        <button className="close" onClick={toggleModalProduct} type="button">
          &times;
        </button>
    );
    const closeBtnBd = (
        <button className="close" onClick={toggleModalBrand} type="button">
            &times;
        </button>
    );

    return (

        <div className="content">
            <Row>
                <Col lg="8">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h2">Danh sách sản phẩm</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <Button color="success" className="animation-on-hover" onClick={toggleModalProduct}>Thêm sản phẩm</Button>
                                {/* Phần modal addPD */}

                                <AddProduct isOpen={modelProduct} toggle={toggleModalProduct} close={closeBtn}></AddProduct>
                                <CustomScrollbar>
                                    <Table>

                                        <thead style={{ position: "sticky", top: 0, zIndex: 1, backdropFilter: 'blur(10px)' }}>
                                            {/* Thêm backdropFilter để làm mờ nền phía sau mà không cần thêm background */}
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Name</th>
                                                <th>Job Position</th>
                                                <th className="text-center">Since</th>
                                                <th className="text-right">Salary</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ top: 100 }}>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>

                                        </tbody>

                                    </Table>
                                </CustomScrollbar>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h2">Danh sách nhãn hàng</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <Button color="success" className="animation-on-hover" onClick={toggleModalBrand}>Thêm nhãn hàng</Button>
                                <AddBrand isOpen={modelBrand} toggle={setModalBrand} close={closeBtnBd}></AddBrand>
                                <CustomScrollbar>
                                    <Table>

                                        <thead style={{ position: "sticky", top: 0, zIndex: 1, backdropFilter: 'blur(10px)' }}>
                                            {/* Thêm backdropFilter để làm mờ nền phía sau mà không cần thêm background */}
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Name</th>
                                                <th>Job Position</th>
                                                <th className="text-center">Since</th>
                                                <th className="text-right">Salary</th>
                                                <th className="text-right">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody style={{ top: 100 }}>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                                <td className="text-right">
                                                    <Button className="btn-icon btn-simple" color="info" size="sm">
                                                        <i className="fa fa-user"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="success" size="sm">
                                                        <i className="fa fa-edit"></i>
                                                    </Button>{` `}
                                                    <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                        <i className="fa fa-times" />
                                                    </Button>{` `}
                                                </td>
                                            </tr>

                                        </tbody>

                                    </Table>
                                </CustomScrollbar>
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}

export default Brands;
