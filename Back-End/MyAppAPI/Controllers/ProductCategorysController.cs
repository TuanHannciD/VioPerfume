using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebOnline.Models;
using static MyAppAPI.DTO.ProductCategoryRequestDto;
using WebOnline.Models.EF;

namespace MyAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategorysController : ControllerBase
    {
        private readonly VioPerfumeDBContext _context;

        public ProductCategorysController(VioPerfumeDBContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategorys
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProductCategoryDTO>>> GetProductCategories()
        {
            var categories = await _context.productCategories
                .Select(c => new ProductCategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Title = c.Title,
                    SeoTitle = c.SeoTitle,
                    SeoDescription = c.SeoDescription,
                    SeoKeyWord = c.SeoKeyWord
                })
                .ToListAsync();

            return Ok(categories);
        }

        // GET: api/ProductCategorys/{id}
        [HttpGet("GetID{id}")]
        public async Task<ActionResult<ProductCategoryDTO>> GetProductCategory(int id)
        {
            var category = await _context.productCategories
                .Where(c => c.Id == id)
                .Select(c => new ProductCategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Title = c.Title,
                    SeoTitle = c.SeoTitle,
                    SeoDescription = c.SeoDescription,
                    SeoKeyWord = c.SeoKeyWord
                })
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // POST: api/ProductCategorys
        [HttpPost("Add")]
        public async Task<ActionResult<ProductCategoryDTO>> CreateProductCategory(CreateProductCategoryDTO createCategoryDTO)
        {
            var category = new ProductCategorys
            {
                Name = createCategoryDTO.Name,
                Title = createCategoryDTO.Title,
                SeoTitle = createCategoryDTO.SeoTitle,
                SeoDescription = createCategoryDTO.SeoDescription,
                SeoKeyWord = createCategoryDTO.SeoKeyWord
            };

            _context.productCategories.Add(category);
            await _context.SaveChangesAsync();

            var createdCategory = new ProductCategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Title = category.Title,
                SeoTitle = category.SeoTitle,
                SeoDescription = category.SeoDescription,
                SeoKeyWord = category.SeoKeyWord
            };

            return CreatedAtAction(nameof(GetProductCategory), new { id = category.Id }, createdCategory);
        }

        // PUT: api/ProductCategorys/{id}
        [HttpPut("Update{id}")]
        public async Task<IActionResult> UpdateProductCategory(int id, UpdateProductCategoryDTO updateCategoryDTO)
        {
            var category = await _context.productCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            category.Name = updateCategoryDTO.Name;
            category.Title = updateCategoryDTO.Title;
            category.SeoTitle = updateCategoryDTO.SeoTitle;
            category.SeoDescription = updateCategoryDTO.SeoDescription;
            category.SeoKeyWord = updateCategoryDTO.SeoKeyWord;

            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ProductCategorys/{id}
        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> DeleteProductCategory(int id)
        {
            var category = await _context.productCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.productCategories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
