using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")] // Chỉ admin có quyền thêm vai trò
public class RolesController : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesController(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    // API thêm vai trò mới vào cơ sở dữ liệu
    [HttpPost("add-role")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        // Kiểm tra xem vai trò đã tồn tại chưa
        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (roleExists)
        {
            return BadRequest("Role already exists.");
        }

        // Thêm vai trò vào cơ sở dữ liệu
        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));

        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' added successfully.");
        }

        // Trả về lỗi nếu có
        return StatusCode(500, "Failed to add role.");
    }
}
