using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.DTO;
using WebOnline.Models;
using WebOnline.Models.EF;

namespace MyAppAPI.Controllers
{
    public class BrandsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly VioPerfumeDBContext _context;
        
        public BrandsController(VioPerfumeDBContext dbContext)
        {
            _context = dbContext;
        }
        [HttpGet("GetAllBranches")]
        public async Task<IActionResult> GetAllBranches()
        {
            var branches = await _context.branches
                                          .Where(b => !b.IsDeleted)
                                          .ToListAsync();

            return Ok(branches);
        }

        // Lấy một nhánh theo ID (chỉ những nhánh chưa bị xóa)
        [HttpGet("GetBranchById/{id}")]
        public async Task<IActionResult> GetBranchById(int id)
        {
            var branch = await _context.branches
                                       .FirstOrDefaultAsync(b => b.Id == id && !b.IsDeleted);

            if (branch == null)
            {
                return NotFound(new { message = "Branch not found" });
            }

            return Ok(branch);
        }

        // Thêm một nhánh mới
        [HttpPost("AddBranch")]
        public async Task<IActionResult> AddBranch([FromBody] BranchRequestDto request)
        {
            if (string.IsNullOrEmpty(request.NameBranch) || string.IsNullOrEmpty(request.Title))
            {
                return BadRequest(new { message = "NameBranch and Title are required" });
            }

            var branch = new Brand
            {
                NameBrand = request.NameBranch,
                Title = request.Title,
                Description = request.Description,
                CreatBy = User.Identity?.Name ?? "System",
                CreatDate = DateTime.Now,
                IsDeleted = false
            };

            await _context.branches.AddAsync(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch created successfully", branch });
        }

        // Cập nhật một nhánh
        [HttpPut("UpdateBranch/{id}")]
        public async Task<IActionResult> UpdateBranch(int id, [FromBody] UpdateBranchRequest request)
        {
            var branch = await _context.branches.FindAsync(id);

            if (branch == null || branch.IsDeleted)
            {
                return NotFound(new { message = "Branch not found" });
            }

            branch.NameBrand = request.NameBranch ?? branch.NameBrand;
            branch.Title = request.Title ?? branch.Title;
            branch.Description = request.Description ?? branch.Description;
            branch.ModifiedBy = User.Identity?.Name ?? "System";
            branch.ModifiedDate = DateTime.Now;

            _context.branches.Update(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch updated successfully", branch });
        }

        // Xóa mềm một nhánh
        [HttpDelete("DeleteBranch/{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.branches.FindAsync(id);

            if (branch == null )
            {
                return NotFound(new { message = "Branch not found" });
            }

            branch.IsDeleted = true;
            branch.ModifiedBy = User.Identity?.Name ?? "System";
            branch.ModifiedDate = DateTime.Now;

            _context.branches.Update(branch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Branch marked as deleted" });
        }

    }
}
