using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.DTO;
using WebOnline.Models;
using WebOnline.Models.EF;
using static MyAppAPI.DTO.ProductsRequestDto;

namespace MyAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly VioPerfumeDBContext _dbContext;

        public ProductsController(VioPerfumeDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GettAllProducts()
        {
            var products = await _dbContext.products.Where(b=> !b.IsDeleted).Select(b=> new
            {
                productsId= b.Id,
                nameProducts=b.NameProducts,
                TitlePD = b.Title,
                DescriptionPD = b.Description,
                OriginPD = b.Origin,
                CapacityPD = b.Capacity,
                ImagePD = b.Image,
                PricePD = b.Price,
                PriceSalePD = b.PriceSale,
                QuantityPD = b.Quantity,
                IsHomePD = b.IsHome,
                IsSalePD = b.IsSale,
                IsFeaturePD = b.IsFeature,
                IsHotPD = b.IsHot,
                ProductCategorysIdPD = b.ProductCategorys.Name,
                SeoTitlePD = b.SeoTitle,
                SeoDescriptionPD = b.SeoDescription,
                SeoKeyWordsPD = b.SeoKeyWords,
                BrandIdPD = b.Branch.NameBrand,
                CreatByPD = b.CreatBy,
                CreatDatePD = b.CreatDate,
                ModifiedByPD = b.ModifiedBy,
                ModifiedDatePD = b.ModifiedDate,
                IsDeletedPD = b.IsDeleted,
                DeletedDatePD = b.DeletedDate,
                FragranceGroupPD = b.FragranceGroup,
                NameProductsPD = b.NameProducts,
                StylePD = b.Style,
                CodeProductsPD = b.CodeProducts,

            }).ToListAsync();
            return Ok(products);
        }

        [HttpGet("GetProductsByID/{id}")]
        public async Task<IActionResult> GetProductsById(int id)
        {
            // Include Brand để lấy thông tin thương hiệu
            var product = await _dbContext.products
                .Include(p => p.Branch).Include(p => p.ProductCategorys) // Join với bảng Brand
                .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Tạo đối tượng trả về với thông tin cần thiết
            var result = new
            {
                productsId = product.Id,
                nameProducts = product.NameProducts,
                TitlePD = product.Title,
                DescriptionPD = product.Description,
                OriginPD =  product.Origin,
                CapacityPD = product.Capacity,
                ImagePD = product.Image,
                PricePD = product.Price,
                PriceSalePD = product.PriceSale,
                QuantityPD = product.Quantity,
                IsHomePD = product.IsHome,
                IsSalePD = product.IsSale,
                IsFeaturePD = product.IsFeature,
                IsHotPD = product.IsHot,
                ProductCategorysIdPD = product.ProductCategorysId,
                ProductCategorysName = product.ProductCategorys.Name,
                SeoTitlePD = product.SeoTitle,
                SeoDescriptionPD = product.SeoDescription,
                SeoKeyWordsPD = product.SeoKeyWords,
                BrandIdPD = product.BrandId,
                BrandName = product.Branch.NameBrand,
                CreatByPD = product.CreatBy,
                CreatDatePD = product.CreatDate,
                ModifiedByPD = product.ModifiedBy,
                ModifiedDatePD = product.ModifiedDate,
                IsDeletedPD = product.IsDeleted,
                DeletedDatePD = product.DeletedDate,
                FragranceGroupPD = product.FragranceGroup,
                NameProductsPD = product.NameProducts,
                StylePD = product.Style,
                CodeProductsPD = product.CodeProducts,

            };

            return Ok(result);
        }



        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProducts([FromBody] AddProductsReqDto requestDto)
        {
            try
            {
                var product = new Products
                {
                    NameProducts = requestDto.Name,
                    CodeProducts = requestDto.Code,
                    BrandId = requestDto.BrandId,
                    ProductCategorysId = requestDto.ProductCategoryID,
                    Price = requestDto.Price,
                    Origin = requestDto.Origin,
                    Capacity = requestDto.Capacity,
                    Description = requestDto.Description,
                    FragranceGroup = requestDto.FragranceGroup,
                    Style = requestDto.Style,
                    Image = requestDto.ImagePath,
                };
                _dbContext.products.Add(product);
                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Product added successfully", product });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPut("UpdateProducts/{id}")]
        public async Task<IActionResult> UpdateProduct(int id,[FromBody] UpdateProductsReqDto updatedProduct)
        {
            try
            {
                var existingProduct = await _dbContext.products.FirstOrDefaultAsync(b => b.Id == id && !b.IsDeleted );

                if (existingProduct == null)
                {
                    return NotFound(new { Message = "Product not found" });
                }

                // Update thông tin sản phẩm
                existingProduct.NameProducts = updatedProduct.NameProducts;
                existingProduct.CodeProducts = updatedProduct.CodeProducts;
                existingProduct.Title = updatedProduct.Title;
                existingProduct.Description = updatedProduct.Description;
                existingProduct.Origin = updatedProduct.Origin;
                existingProduct.Capacity = updatedProduct.Capacity;
                existingProduct.FragranceGroup = updatedProduct.FragranceGroup;
                existingProduct.Style = updatedProduct.Style;
                existingProduct.Image = updatedProduct.ImagePath;
                existingProduct.Price = updatedProduct.Price;
                existingProduct.PriceSale = updatedProduct.PriceSale;
                existingProduct.Quantity = updatedProduct.Quantity;
                existingProduct.IsHome = updatedProduct.IsHome;
                existingProduct.IsSale = updatedProduct.IsSale;
                existingProduct.IsFeature = updatedProduct.IsFeature;
                existingProduct.IsHot = updatedProduct.IsHot;
                existingProduct.SeoTitle = updatedProduct.SeoTitle;
                existingProduct.SeoDescription = updatedProduct.SeoDescription;
                existingProduct.SeoKeyWords = updatedProduct.SeoKeyWords;
                existingProduct.ProductCategorysId = updatedProduct.ProductCategorysId;
                existingProduct.BrandId = updatedProduct.BrandId;

                _dbContext.products.Update(existingProduct);
                await _dbContext.SaveChangesAsync();

                return Ok(new { Message = "Product updated successfully", Product = existingProduct });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the product", Error = ex.Message });
            }
        }
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var product = await _dbContext.products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new { message = "Branch not found" });
            }

            product.IsDeleted = true;
            product.DeletedDate = DateTime.Now;

            _dbContext.products.Update(product);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Branch marked as deleted" });
        }
    }
}
