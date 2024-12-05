import { changeRole } from "api/changeRole";
import { getAllRole } from "api/getAllRole";
import { getRoleByPhoneNumber } from "api/getRoleByPhoneNumber";
import { getUserProfile } from "api/user";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";

const Accounts = ({ isOpen= false, onClose = () =>{} }) => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userInfor, setUserInfor] = useState({ userName: "", currentRole: "" });
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [modal, setModal] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Đóng/mở modal
  const toggleModal = () => {
    setModal(!modal);
    if (modal && typeof onClose === "function") {
      onClose();
    }
    // Reset state khi đóng modal
    if (!modal) {
      setPhoneNumber("");
      setUserInfor({ userName: "", currentRole: "" });
      setSelectedRole("");
      setIsLoading(false);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    }
  };

  // Fetch danh sách admin, customer, và roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminData, customerData, roleData] = await Promise.all([
          getUserProfile("admin"),
          getUserProfile("customer"),
          getAllRole(),
        ]);
        setAdminUsers(adminData);
        setCustomerUsers(customerData);
        setRoles(roleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch thông tin người dùng theo số điện thoại (debounce)
  useEffect(() => {
    if (!phoneNumber || !modal) return;

    // Clear timeout trước đó nếu có
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await getRoleByPhoneNumber(phoneNumber);
        setUserInfor(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfor({ userName: "", currentRole: "Không tìm thấy" });
      } finally {
        setIsLoading(false);
      }
    }, 1500);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [phoneNumber, modal]);

  // Hàm cập nhật vai trò
  const handleUpdateRole = async () => {
    if (!selectedRole) return;
    try {
      const credential = {
        phoneNumber : phoneNumber,
        changeRole : selectedRole
      }
      await changeRole(credential);
      alert(`Đã cập nhật vai trò thành: ${selectedRole}`);
      toggleModal();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Cập nhật vai trò thất bại!");
    }
  };

  const closeBtn = (
    <button className="close" onClick={toggleModal} type="button">
      &times;
    </button>
  );

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h2">
                Danh sách tài khoản Admin
                <Button color="warning" className="float-right" onClick={toggleModal}>
                  Chỉnh sửa quyền
                </Button>
              </CardTitle>
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
                      <th>Modified Date</th>
                      <th>Modified By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Không có tài khoản Admin
                        </td>
                      </tr>
                    ) : (
                      adminUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.userName}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.roles.join(", ")}</td>
                          <td>{user.creatDate}</td>
                          <td>{user.modifiedDate}</td>
                          <td>{user.modifiedBy}</td>
                        </tr>
                      ))
                    )}
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
                      <th>Phone</th>
                      <th>Roles</th>
                      <th>Date Created</th>
                      <th>Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerUsers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Không có tài khoản khách
                        </td>
                      </tr>
                    ) : (
                      customerUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.userName}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.roles.join(", ")}</td>
                          <td>{user.creatDate}</td>
                          <td>{user.modifiedDate}</td>
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

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} close={closeBtn}>
          Phân quyền tài khoản
        </ModalHeader>
        <ModalBody>
          <span className="text-danger">
            Lưu ý: Tài khoản cần phải được đăng ký và có trong danh sách khách hàng trước đó.
          </span>
          <br />
          <Label htmlFor="phoneNumber">Nhập số điện thoại</Label>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="Nhập số điện thoại..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {isLoading ? (
            <p>Đang tải thông tin...</p>
          ) : (
            <>
              <Label>Tên người thay đổi</Label>
              <Input readOnly value={userInfor.userName} className="bg-light text-dark" />
              <Label>Chức vụ hiện tại</Label>
              <Input readOnly value={userInfor.currentRole} className="bg-light text-dark" />
              <Label htmlFor="role">Chọn vai trò mới</Label>
              <Input
                id="role"
                type="select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn vai trò --
                </option>
                { roles.map((role) => (
                  <option key={role.roleId} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Input>
            </>
          )}
        </ModalBody>
        <ModalFooter className="justify-content-between custom-footer">
          <Button color="primary" onClick={handleUpdateRole} disabled={!selectedRole}>
            Cập Nhật
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

Accounts.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Accounts;
