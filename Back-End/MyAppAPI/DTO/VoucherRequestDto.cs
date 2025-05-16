namespace MyAppAPI.DTO
{
    public class VoucherRequestDto
    {
        public class GetAllVoucher
        {
            public int ID { get; set; }
            public string Type { get; set; }
            public string Code { get; set; }
            public decimal DiscountValue { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public bool IsActive { get; set; }
            public int Quantity { get; set; }

        }
        public class AddVoucherRequest
        {
            public string CodeVoucher { get; set; }
            public int? Type { get; set; }
            public decimal? DiscountValue { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public bool? IsActive { get; set; }
            public bool IsGlobal { get; set; }
            public int? Quantity { get; set; }
            public List<int>? ProductID { get; set; }
        }

        public class GetByID
        {
            public string Code { get; set; }
            public string Type { get; set; }
            public decimal DiscountValue { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public bool IsActive { get; set; }
            public bool IsGlobal { get; set; }
            public int Quantity { get; set; }
            public List<ProductVoucherDto> ProductMessage { get; set; }
        }

        public class UpdateVoucherDto
        {
            public string Code { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public decimal DiscountValue { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public bool IsActive { get; set; }
            public bool IsGlobal { get; set; }
            public bool IsDelete { get; set; }
            public int Quantity { get; set; }

            public List<int> ProductId { get; set; }
        }
        public class ProductVoucherDto
        {
            public int ProductId { get; set; }
            public string ProductName { get; set; }
        }

    }
}
