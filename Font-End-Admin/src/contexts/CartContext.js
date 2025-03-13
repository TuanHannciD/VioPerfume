import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCart } from "api/apiCarts"; // Import API trực tiếp

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Hàm fetchCart lấy dữ liệu giỏ hàng
    const fetchCart = useCallback(async () => {
        try {
            const cartData = await getCart(`?timestamp=${Date.now()}`);
            return cartData || [];
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return [];
        }
    }, []);

    // Load giỏ hàng khi component mount
    useEffect(() => {
        const loadCart = async () => {
            const cartData = await fetchCart();
            setCartItems(cartData?.cartItems || []);
        };
        loadCart();
    }, [fetchCart]);

    // Hàm cập nhật giỏ hàng khi có thay đổi
    const refreshCart = async () => {
        const newCartData = await fetchCart();
        setCartItems(newCartData?.cartItems || []);
    };

    return (
        <CartContext.Provider value={{ cartItems, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng giỏ hàng
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart() phải được sử dụng bên trong CartProvider");
    }
    return context;
};
