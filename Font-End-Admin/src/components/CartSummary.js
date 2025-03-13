import React from 'react';
import { Button, Card, Input, Table } from 'reactstrap';

const CartSummary = ({ cart = [], discountCode, applyDiscount, handleOrder }) => {
    const shippingFee = 92300; // phí vận chuyển cố định
    const discountValue = discountCode ? 5000 : 0; // giá trị voucher giảm giá

    // Tính tổng tiền dựa vào dữ liệu `fetchCart()`
    const totalPrice = cart.reduce((sum, product) => sum + ((product.productPrice) * (product.quantity || 1)), 0);
    const totalPayment = totalPrice + shippingFee - discountValue; // tổng thanh toán

    return (
        <div>
            <div>
                <h1>Giỏ hàng</h1>
                {cart.length === 0 ? (
                    <p>Giỏ hàng trống.</p>
                ) : (
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(product => (
                                <tr key={product.cartItemId}>
                                    <td>{product.productName}</td>
                                    <td>{product.productPrice.toLocaleString()} VNĐ</td>
                                    <td>{product.quantity || 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <Input
                    type="text"
                    placeholder="Discount Code"
                    onChange={e => applyDiscount(e.target.value)}
                />
            </div>
            <div>
                <Card>
                    <h4 className='text-success'>Tổng tiền hàng: {totalPrice.toLocaleString()} VNĐ</h4>
                    <h5 className='text-warning'>Tổng tiền phí vận chuyển: {shippingFee.toLocaleString()} VNĐ</h5>
                    <h5 className='text-warning'>Tổng cộng Voucher giảm giá: - {discountValue.toLocaleString()} VNĐ</h5>
                    <h5 className='text-warning'>Tổng thanh toán: {totalPayment.toLocaleString()} VNĐ</h5>
                    <Button color="success" onClick={handleOrder} disabled={cart.length === 0}>
                        {cart.length === 0 ? "Giỏ hàng trống" : "Đặt hàng"}
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default CartSummary;
