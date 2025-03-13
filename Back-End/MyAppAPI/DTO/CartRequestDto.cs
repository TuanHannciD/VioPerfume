namespace MyAppAPI.DTO
{
    public class CartRequestDto
    {
        public class AddProductToCartRequest
        {
            public int ProductId { get; set; }    // ID của sản phẩm cần thêm
            public int Quantity { get; set; }
        }

        public class CartItemUpdateRequest
        {
            public int ProductID { get; set; }
            public int QuantityChange { get; set; } // Số lượng thay đổi (+1 hoặc -1)
        }
    }
}
