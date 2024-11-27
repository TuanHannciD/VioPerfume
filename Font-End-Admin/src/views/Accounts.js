import { getUserProfile } from "api/user";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Table, CardHeader, CardBody, CardTitle, Row, Col, Button, Modal, ModalFooter, ModalHeader, ModalBody, Input, Label } from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";

const Accounts = ({ roles }) => {
  const [adminUsers, setAdminUsers] = useState([]); // Dữ liệu người dùng admin
  const [customerUsers, setCustomerUsers] = useState([]); // Dữ liệu người dùng customer
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Fetch users based on roles
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Gọi API để lấy người dùng cho role admin
        const adminData = await getUserProfile('admin');
        setAdminUsers(adminData);

        // Gọi API để lấy người dùng cho role customer
        const customerData = await getUserProfile('customer');
        setCustomerUsers(customerData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); // Mảng dependency trống nghĩa là chỉ chạy khi component load lần đầu

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <div className="content">
        <Row>
          {/* Bảng Admin */}
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">
                  Danh sách tài khoản Admin
                  <Button color="warning" className="float-right" onClick={toggle}>
                    Chỉnh sửa quyền
                  </Button>
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} close={closeBtn}>
                      Phân quyền tài khoản
                    </ModalHeader>
                    <ModalBody>
                      <span className="text-danger">Lưu ý: Tài khoản cần phải được đăng ký và có trong danh sách khác hàng trước đó.</span>
                      <br />
                      <Label htmlFor="numberPhone">Nhập số điện thoại</Label>
                      <div>
                        <Input className="text-warning " id="numberPhone" type="text" />
                      </div><br />
                      <span>Tên người thay đổi</span>
                      <Input readOnly className="bg-light text-dark" color="warning" />
                      <span>Chức vụ hiện tại</span>
                      <Input readOnly className="bg-light text-dark" color="warning" />
                      <Label htmlFor="role">Chức vụ thay đổi</Label><br />
                      <Input id="role" name="select" type="select">
                        <option>Admin</option>
                        <option>Khách hàng</option>
                        <option>Rửa bát</option>
                        <option>Thu ngân</option>
                        <option>Tiểu nhị</option>
                      </Input>
                    </ModalBody>
                    <ModalFooter className="justify-content-between custom-footer">
                      <Button color="primary" onClick={toggle}>
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
                        <th>Phone</th>
                        <th>Roles</th>
                        <th>Date Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">Không có tài khoản Admin</td>
                        </tr>
                      ) : (
                        adminUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.roles.join(', ')}</td>
                            <td>{user.creatDate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </CustomScrollbar>
              </CardBody>
            </Card>
          </Col>

          {/* Bảng Customer */}
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
                        <th>Phone</th>
                        <th>Roles</th>
                        <th>Date Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerUsers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">Không có tài khoản khách</td>
                        </tr>
                      ) : (
                        customerUsers.map(user => (
                          <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.roles.join(', ')}</td>
                            <td>{user.creatDate}</td>
                          </tr>
                        ))
                      )}
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
