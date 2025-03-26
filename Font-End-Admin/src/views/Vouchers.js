import { getAllVoucher } from 'api/apiVouchers';
import React, { useEffect, useState } from 'react';
import { Col, Row, Button, ButtonGroup, Input, Card, CardBody, CardTitle, CardHeader, Table, Badge } from 'reactstrap';
import CustomScrollbar from 'utils/CustomScrollbar';
import { AddVoucher, DetailVoucherByID } from './Modals/VoucherModal';


const Voucher = () => {
    const [allVoucher, setGetAllVoucher] = useState([]);
    const [addVoucherModal, setAddVoucherModal] = useState(false);
    const [detailVoucher,setDetailVoucher] = useState(null);

    useEffect(() => {
        const fetchAllVoucher = async () => {
            try {
                const data = await getAllVoucher();
                setGetAllVoucher(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu getall voucher:", error);
            }
        };
        fetchAllVoucher();
    }, []);

    const toggleModalAddVoucher = () => {
        setAddVoucherModal(!addVoucherModal);
    };

    const toggleDetailVoucher = () => {
        setDetailVoucher(null);
    }


    const closeBtnAddVoucher = (
        <button className='close' onClick={toggleModalAddVoucher} type='button'>
            &times;
        </button>
    );
    const closeBtndetailVoucher = (
        <button className='close' onClick={toggleDetailVoucher} type='button'>
            &times;
        </button>
    )

    return (
        <div className="content">
            <div className="content text-center">
                <h1>
                    Voucher
                </h1>
            </div>
            <div>
                <Row>
                    <Col lg="2">
                        <Button color='success' className='animation-on-hober' onClick={toggleModalAddVoucher}>Thêm mới Voucher</Button>
                        <hr></hr>
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4" className="text-center ">Bộ lọc tìm kiếm</CardTitle>
                            </CardHeader>
                            <CardBody >
                                <div >
                                    <Input placeholder="Nhập nội dung ở đây..." />
                                    <br />
                                    <span >Lọc theo ngày bắt đầu</span>
                                    <Input type="date" />
                                    <br />
                                    <span >Lọc theo ngày kết thúc</span>
                                    <Input type="date" />
                                    <br />
                                    <span>Lọc theo trạng thái</span>
                                    <ButtonGroup vertical>
                                        <Button color="danger" size="sm">
                                            Hết hạn
                                        </Button>
                                        <br />
                                        <Button color="warning" size="sm">
                                            Hết số lượng
                                        </Button>
                                        <br />
                                        <Button color="success" size="sm">
                                            Còn sử dụng
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
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Status</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody style={{ top: 100 }}>
                                        {!allVoucher || allVoucher.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className='text-center'>
                                                    Không có phiếu giảm giá nào hoặc lỗi khi lấy
                                                </td>
                                            </tr>
                                        ) : (
                                            allVoucher.map((voucher) => (
                                                <tr key={voucher.id}>
                                                    <td>{voucher.type}</td>
                                                    <td>{voucher.code}</td>
                                                    <td>{voucher.startDate}</td>
                                                    <td>{voucher.endDate}</td>
                                                    <td>
                                                        {voucher.isActive ? (
                                                            <Badge color="success">Đang hoạt động</Badge>
                                                        ) : (
                                                            <Badge color="danger">Không hoạt động</Badge>
                                                        )}
                                                    </td>
                                                    <td>{voucher.quantity}</td>
                                                    <td>
                                                        <Button
                                                            className="btn-icon btn-simple"
                                                            color="info"
                                                            size="sm"
                                                            onClick={() => {setDetailVoucher(voucher.id)}}                                                        >
                                                            <i className="fa fa-user"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>


                                </Table>
                            </CustomScrollbar>
                        </div>
                    </Col>
                </Row>
                {addVoucherModal && (
                    <AddVoucher
                        isOpen={!!addVoucherModal}
                        toggle={toggleModalAddVoucher}
                        close={closeBtnAddVoucher}
                    />
                )}
                {detailVoucher && (
                    <DetailVoucherByID 
                        isOpen={!!detailVoucher}
                        toggle={toggleDetailVoucher}
                        close={closeBtndetailVoucher}
                        voucherID={detailVoucher}
                    />
                )}
            </div>
        </div>

    );
};

export default Voucher;
