using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyAppAPI.Middleware
{
    public class TokenValidationMiddleware
    {
        private readonly RequestDelegate _requestDelegate;

        public TokenValidationMiddleware(RequestDelegate requestDelegate)
        {
            _requestDelegate = requestDelegate;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Bỏ qua endpoint 
            if (context.Request.Path.StartsWithSegments("/login") || context.Request.Path.StartsWithSegments("/register"))
            {
                await _requestDelegate(context);
                return;
            }

            var token = context.Request.Cookies["auth_token"];
            if (string.IsNullOrEmpty(token))
            {
                // Không có token trong cookie
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized: Missing token.");
                return;
            }

            if (!IsTokenValid(token, out var validationError))
            {
                // Token không hợp lệ hoặc hết hạn
                context.Response.Cookies.Delete("auth_token");
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync($"Unauthorized: {validationError}");
                return;
            }

            await _requestDelegate(context); // Pass request to next middleware
        }

        private bool IsTokenValid(string token, out string validationError)
        {
            validationError = string.Empty;

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);

                // Kiểm tra role trong claim
                var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
                if (roleClaim == null)
                {
                    validationError = "Token does not contain a valid role.";
                    return false;
                }

                if (roleClaim.Value != "Admin")
                {
                    validationError = "Unauthorized: Insufficient role. Admin access required.";
                    return false;
                }

                // Kiểm tra hạn sử dụng token
                if (jwtToken.ValidTo < DateTime.UtcNow)
                {
                    validationError = "Token has expired.";
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                validationError = $"Error processing token: {ex.Message}";
                return false;
            }
        }
    }
}
