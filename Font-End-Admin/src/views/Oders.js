import React from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Input, ButtonGroup, Button, Table } from "reactstrap";
import CustomScrollbar from "utils/CustomScrollbar";


function Oders() {
    return (
        <div className="content">
            <div className="content text-center">
                <h1>
                    Đơn Hàng
                </h1>
            </div>
            <div>
                <Row>
                    <Col lg="2">
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4" className="text-center ">Bộ lọc tìm kiếm</CardTitle>
                            </CardHeader>
                            <CardBody >
                                <div >
                                    <Input placeholder="Nhập nội dung ở đây..." />
                                    <br />
                                    <span >Lọc theo thời gian</span>
                                    <Input type="date" />
                                    <br />
                                    <span>Lọc theo trạng thái</span>
                                    <ButtonGroup vertical>
                                        <Button color="danger" size="sm">
                                            Đã nhận
                                        </Button>
                                        <br />
                                        <Button color="warning" size="sm">
                                            Đang xử lý
                                        </Button>
                                        <br />
                                        <Button color="success" size="sm">
                                            Hoàn Thành
                                        </Button>
                                    </ButtonGroup>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <div>
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
                                            </tr>
                                        </thead>

                                        <tbody style={{ top: 100 }}>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">3</td>
                                                <td>Alex Mike</td>
                                                <td>Designer</td>
                                                <td className="text-center">2012</td>
                                                <td className="text-right">€ 99,201</td>
                                            </tr>

                                        </tbody>

                                    </Table>
                                </CustomScrollbar>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default Oders;