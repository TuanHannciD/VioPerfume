import React, { useEffect, useState } from 'react';
import OrderForm from '../components/OrderForm';
import CartSummary from '../components/CartSummary';
import ProductTable from '../components/ProductTable';
import { getAllProducts } from "api/apiProducts";
import { Col, Row } from 'reactstrap';
import { useCart } from 'contexts/CartContext';
import { useCartActions } from 'services/cartService';

const OrderPage = () => {
   
    const [discountCode, setDiscountCode] = useState('');
    const [products, setProducts] = useState([]);

    const {fetchCart,refreshCart,cartItems} = useCart();
    const {handleAddToCart} = useCartActions();



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="content">
            <Row>
                <Col lg="6">
                    <CartSummary
                        cart={cartItems}
                        discountCode={discountCode}
                        applyDiscount={setDiscountCode}
                        handleOrder={() => alert('Đặt hàng thành công!')}
                    />
                    {/* Truyền cart vào OrderForm */}
                    <OrderForm cart={cartItems} onOrderSubmit={(orderDetails) => console.log('Order Submitted:', { cartItems, discountCode, ...orderDetails })} />
                </Col>
                <Col lg="5">
                    <ProductTable products={products} addToOrder={handleAddToCart}/>
                </Col>
            </Row>
        </div>
    );
};

export default OrderPage;
