import { useRef } from "react";
import { increaseQuantity, decreaseQuantity, removeItem,postAddCart } from "api/apiCarts";
import { useCart } from "contexts/CartContext";

export const useCartActions = () => {
    const { refreshCart } = useCart();
    const quantityChange = useRef(0);
    const timerRef = useRef(null);

    const debounceUpdate = (callback, productId) => {
        quantityChange.current += 1;
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            try {
                await callback( productId, quantityChange.current);
                quantityChange.current = 0;
                setTimeout(() => {
                    refreshCart();
                }, 1000);
            } catch (error) {
                console.error("Lỗi cập nhật số lượng:", error);
            }
        }, 1000);
    };
    const handleAddToCart = (productId) => {
        debounceUpdate(postAddCart,productId);
    }

    const handleIncreaseQuantity = (productId) => {
        debounceUpdate(increaseQuantity, productId);
    };

    const handleDecreaseQuantity = ( productId) => {
        debounceUpdate(decreaseQuantity,  productId);
    };

    const handleRemoveItem = async (id) => {
        try {
            await removeItem(id);
            await refreshCart();
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
        }
    };

    return { handleAddToCart,handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem };
};
