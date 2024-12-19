using System.ComponentModel.DataAnnotations;

namespace MyAppAPI.DTO
{
    public class ProductCategoryRequestDto
    {
        public class ProductCategoryDTO
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Title { get; set; }
            public string? SeoTitle { get; set; }
            public string? SeoDescription { get; set; }
            public string? SeoKeyWord { get; set; }
        }

        public class CreateProductCategoryDTO
        {
            [Required]
            [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6 - 256 kí tự !!")]
            public string Name { get; set; }
            public string Title { get; set; }
            public string? SeoTitle { get; set; }
            public string? SeoDescription { get; set; }
            public string? SeoKeyWord { get; set; }
        }
        public class UpdateProductCategoryDTO
        {
            [Required]
            [StringLength(256, MinimumLength = 6, ErrorMessage = "Phải dài từ 6 - 256 kí tự !!")]
            public string Name { get; set; }
            public string Title { get; set; }
            public string? SeoTitle { get; set; }
            public string? SeoDescription { get; set; }
            public string? SeoKeyWord { get; set; }
        }


    }
}
