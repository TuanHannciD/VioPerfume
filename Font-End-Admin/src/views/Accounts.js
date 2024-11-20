import PropTypes from "prop-types";
import React, { useState } from "react";
// reactstrap components
import { Card, Table, CardHeader, CardBody, CardTitle, Row, Col, Button, Modal, ModalFooter, ModalHeader, ModalBody, Input, Label } from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";


function Accounts(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">
                  Danh sách tài khoản Admin
                  <Button color="warning" className="float-right" onClick={toggle}>
                    Chỉnh sửa quyền
                  </Button>
                  <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle} close={closeBtn}>
                      Phân quyền tài khoản
                    </ModalHeader>
                    <ModalBody>
                      <span className="text-danger">Lưu ý: Tài khoản cần phải được đăng ký và có trong danh sách khác hàng trước đó.</span>
                      <br/>
                      <Label htmlFor="numberPhone">Nhập số điện thoại</Label>
                      <div>
                        <Input className="text-warning " id="numberPhone"
                          type="text"
                        />
                      </div><br/>
                      <span>Chức vụ hiện tại</span>
                      <Input readOnly className="bg-light text-dark" color="warning"/>
                      <Label htmlFor="role">Chức vụ thay đổi</Label><br/>
                      <Input
                        id="role"
                        name="select"
                        type="select"
                      >
                        <option>
                          Admin
                        </option>
                        <option>
                          Khách hàng
                        </option>
                        <option>
                          Rửa bát
                        </option>
                        <option>
                          Thu ngân
                        </option>
                        <option>
                          Tiểu nhị
                        </option>
                      </Input>
                    </ModalBody>
                    <ModalFooter className="justify-content-between custom-footer">
                      <Button color="primary" onClick={toggle} >
                        Do Something
                      </Button>{' '}
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CustomScrollbar height='400px'>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Adress</th>
                        <th>Date created</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CustomScrollbar>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h2">Danh sách tài khoản khách</CardTitle>
              </CardHeader>
              <CardBody>
                <CustomScrollbar height="400px">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Adress</th>
                        <th>Date created</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>

                    </tbody>
                  </Table>
                </CustomScrollbar>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
Accounts.prototype = {
  className: PropTypes.string,
};

export default Accounts;
