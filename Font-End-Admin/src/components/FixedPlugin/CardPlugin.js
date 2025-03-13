import { useCart } from "contexts/CartContext";
import React, { useState } from "react";
import { Button, Dropdown, DropdownToggle, DropdownMenu, Badge } from "reactstrap";
import { useCartActions } from "services/cartService";

function CartPlugin() {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const { cartItems, refreshCart } = useCart();
  const { handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveItem } = useCartActions();

  const toggleDropdown = () => {
    setDropDownIsOpen((prevState) => !prevState);
  };

  // Cập nhật số lượng sản phẩm và đảm bảo API hoàn thành trước khi refreshCart()
  const updateQuantity = async (action,  productId) => {
    console.log("updateQuantity() called with:", action, productId);

    try {
      if (action === "increase") {
        await handleIncreaseQuantity( productId);
      } else {
        await handleDecreaseQuantity( productId);
      }
      await refreshCart(); // Chỉ gọi khi API đã hoàn tất
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (cartItemId) => {
    try {
      await handleRemoveItem(cartItemId);
      console.log(`Removed item: ${cartItemId}`);
      await refreshCart();
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="cart-plugin">
      <Dropdown isOpen={dropDownIsOpen} toggle={toggleDropdown}>
        <DropdownToggle tag="div">
          <i className="fa fa-shopping-cart fa-2x" />
          <Badge color="danger">{cartItems.length}</Badge>
        </DropdownToggle>
        <DropdownMenu>
          <div className="dropdown-header">
            <li className="header-title">YOUR CART</li>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.cartItemId} className="dropdown-item">
                <span className="color-label">{item.productName}</span>
                <span className="color-label">${item.productPrice}</span>

                <div className="item-actions">
                  <Button size="sm" color="primary" onClick={() => updateQuantity("decrease",  item.productId)}>
                    -
                  </Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button size="sm" color="primary" onClick={() => updateQuantity("increase",  item.productId)}>
                    +
                  </Button>
                  <Button size="sm" color="danger" onClick={() => removeItem(item.cartItemId)}>
                    x
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="dropdown-item text-center">Your cart is empty.</div>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CartPlugin;
