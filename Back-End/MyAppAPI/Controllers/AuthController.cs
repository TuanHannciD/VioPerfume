using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebOnline.Models.EF;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using MyAppAPI.DTO;

public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtSettings _jwtSettings;

    public AuthController(ILogger<AuthController> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtSettings jwt)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtSettings = jwt;
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

                // Tạo JWT token
                var claims = new[] 
                {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role),
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var jwtToken = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer, // Thay bằng thông tin của bạn
                    audience: _jwtSettings.Audience, // Thay bằng thông tin của bạn
                    claims: claims,
                    expires: DateTime.Now.AddHours(1), // Token hết hạn sau 1 giờ
                    signingCredentials: signingCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);

                // Trả về token trong response
                Response.Cookies.Append("auth_token", tokenString, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.Now.AddHours(1)
                });
                return Ok("Login successful");
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
}


