using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebOnline.Models.EF;

public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(ILogger<AuthController> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
            {
                _logger.LogWarning("Login failed: User not found for {Username}", loginDto.Username);
                return Unauthorized(new { message = "Invalid username or password." });
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);

                // Kiểm tra role của user
                var roles = await _userManager.GetRolesAsync(user);
                string role = roles.Contains("Admin") ? "Admin" : "Customer";

                _logger.LogInformation("User {Username} logged in successfully with role {Role}.", loginDto.Username, role);

                // Trả về role trong response
                return Ok(new
                {
                    message = "Login successful",
                    role = role
                });
            }
            else
            {
                _logger.LogWarning("Login failed: Incorrect password for {Username}", loginDto.Username);
                return Unauthorized(new { message = "Invalid username or password." });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing the login request.");
            return StatusCode(500, new { message = "An internal error occurred." });
        }
    }


    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser
            {
                FullName = model.Fullname,
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.NumberPhone,
                Address = model.Adress,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Gán role mặc định
                await _userManager.AddToRoleAsync(user, "Customer");

                return Ok(new { message = "User created successfully!" });
            }

            return BadRequest(result.Errors);
        }

        return BadRequest("Invalid model");
    }


    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class RegisterModel
    {
        public string Fullname { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }  // Có thể bỏ qua nếu không cần email
        public string NumberPhone { get; set; }
        public string Adress { get; set; }

    }
    public class Role
    {
        public string Name { get; set; }
     }
}


