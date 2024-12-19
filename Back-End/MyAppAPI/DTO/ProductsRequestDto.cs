namespace MyAppAPI.DTO
{
    public class ProductsRequestDto
    {
        public class AddProductsReqDto
        {
            public string Name { get; set; }
            public string Code { get; set; }
            public int BrandId { get; set; }
            public decimal Price { get; set; }
            public string Origin { get; set; }
            public int Capacity { get; set; }
            public int ProductCategoryID { get; set; }
            public string Description { get; set; }
            public string FragranceGroup { get; set; }
            public string Style { get; set; }
            public string ImagePath { get; set; }
        }

        public class UpdateProductsReqDto
        {
            public string  NameProducts { get; set; }
            public string CodeProducts { get; set; }
            public string? Title { get; set; }
            public string Description { get; set; }
            public string Origin { get; set; }
            public int Capacity { get; set; }
            public string FragranceGroup { get; set; }
            public string Style { get; set; }
            public string ImagePath { get; set; }
            public decimal Price { get; set; }
            public decimal? PriceSale { get; set; }
            public int? Quantity { get; set; }
            public bool IsHome { get; set; }
            public bool IsSale { get; set; }
            public bool IsFeature { get; set; }
            public bool IsHot { get; set; }
            public string? SeoTitle { get; set; }
            public string? SeoDescription { get; set; }
            public string? SeoKeyWords { get; set; }
            public int ProductCategorysId { get; set; }
            public int BrandId { get; set; }
        }
    }

}
