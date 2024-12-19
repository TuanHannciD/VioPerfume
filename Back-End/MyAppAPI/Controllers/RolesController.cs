using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.DTO;
using System.Threading.Tasks;
using WebOnline.Models.EF;

[Route("api/[controller]")]
[ApiController]
public class RolesController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesController(RoleManager<IdentityRole> roleManager , UserManager<ApplicationUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [HttpGet("GetAllRole")]
    public async Task<IActionResult> GetAllRole()
    {
        // Lấy tất cả các roles và trả về 'roleName' và 'roleId'
        var role = await _roleManager.Roles.Select(r => new
        {
            roleId = r.Id,       // Lấy Id của role
            roleName = r.Name    // Lấy tên của role
        }).ToListAsync();

        // Trả về danh sách các role
        return Ok(new
        {
            roles = role        // Trả về danh sách các role
        });
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
        return StatusCode(500, new { Message = "Failed to add role.", Errors = result.Errors });

    }   
    [HttpGet("GetUsersByRole")]
    public async Task<IActionResult> GetUsersByRole([FromQuery] string[] roles)
    {
        if (roles == null || roles.Length == 0)
        {
            return BadRequest("Roles parameter is required.");
        }

        var usersInRoles = new List<object>();

        foreach (var role in roles)
        {
            // Kiểm tra role có tồn tại không
            if (!await _roleManager.RoleExistsAsync(role))
            {
                return BadRequest($"Role '{role}' does not exist.");
            }

            // Lấy danh sách người dùng theo vai trò
            var users = await _userManager.GetUsersInRoleAsync(role);
            usersInRoles.AddRange(users.Select(user => new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FullName,
                user.PhoneNumber,
                CreatDate = user.CreatDate.ToString("dd MMM yyyy, hh:mm tt"),  
                ModifiedDate = user.ModifiedDate?.ToString("dd MMM yyyy, hh:mm tt"),
                user.ModifiedBy,
                Roles = new[] { role }
            }));
        }

        return Ok(usersInRoles);

        
    }

    [HttpGet("GetUserInfoByPhoneNumber/{phoneNumber}")]
    public async Task<IActionResult> GetUserInfoByPhoneNumber(string phoneNumber)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(new
        {
            userName = user.UserName,
            phoneNumber = user.PhoneNumber,
            role = roles
        });
    }

    [HttpPost("UpdateRoleByNumberPhone")]
    public async Task<IActionResult> UpdateRoleByNumberPhone([FromBody] UpdateUserRoleRequest request)
    {
        var existingRole = await _roleManager.RoleExistsAsync(request.ChangeRole);
        if (!existingRole)
        {
            return BadRequest(new { mesage = "The specified role does not exist" });
        }
        //Tìm ngdnfg bằng sdt
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.PhoneNumber == request.PhoneNumber);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        var currentRoles = await _userManager.GetRolesAsync(user);// Lấy tất cả các role hiện tại của người dùng
        var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);    // Xóa tất cả các role hiện tại
        if (!removeResult.Succeeded)
        {
            return BadRequest(new { message = "Failed to remove existing roles" });
        }
        var addResult = await _userManager.AddToRoleAsync(user, request.ChangeRole);
        if (!addResult.Succeeded) 
        {
            return BadRequest(new { message = "Failed to assign the new role" });
        }
        return Ok(new 
        {
            message = "User role updated successfully",
            user = new
            {
                userRole = currentRoles,
                userName = user.UserName,
            }
        });
    }
    [HttpDelete("DeleteRoleById")]
    public async Task<IActionResult> DeleteRoleById([FromQuery] string roleId)
    {
        if (string.IsNullOrWhiteSpace(roleId))
        {
            return BadRequest("Role ID is required.");
        }

        // Tìm vai trò theo ID
        var role = await _roleManager.FindByIdAsync(roleId);
        if (role == null)
        {
            return NotFound($"Role with ID '{roleId}' does not exist.");
        }

        // Xóa vai trò
        var result = await _roleManager.DeleteAsync(role);
        if (result.Succeeded)
        {
            return Ok($"Role with ID '{roleId}' has been deleted successfully.");
        }

        // Xử lý lỗi nếu việc xóa không thành công
        var errors = string.Join("; ", result.Errors.Select(e => e.Description));
        return BadRequest($"Failed to delete role with ID '{roleId}'. Errors: {errors}");
    }


}
