using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.DTO;
using WebOnline.Models;
using WebOnline.Models.EF;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using MyAppAPI.Interface;
using MyAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<VioPerfumeDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("VioPerfumeDB")));

// Cấu hình Identity    
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<VioPerfumeDBContext>()
    .AddDefaultTokenProviders();

// Cấu hình để có thể truy cập HttpContext
builder.Services.AddHttpContextAccessor();

// Cấu hình CORS cho phép truy cập từ các domain của frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // Các domain của FE
              .AllowAnyHeader()
              .AllowCredentials() // Cho phép gửi cookie
              .AllowAnyMethod();
    });
});

// Cấu hình JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
builder.Services.AddSingleton(jwtSettings);

// Cấu hình Authentication sử dụng JWT Bearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
        
        RoleClaimType = ClaimTypes.Role,
        
        
    };

    // Xử lý token từ cookie
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Cookies["auth_token"]; // Lấy token từ cookie
            if (!string.IsNullOrEmpty(token))
            {
                context.Token = token; // Gán token vào context để xác thực
            }
            return Task.CompletedTask;
        }
    };
});

// Cấu hình Cookie cho ứng dụng
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;  // Không thể truy cập cookie từ JavaScript
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);  // Thời gian hết hạn cookie
    options.Cookie.SameSite = SameSiteMode.None;  // Cho phép gửi cookie trong yêu cầu từ domain khác
    options.SlidingExpiration = true;  // Cập nhật thời gian hết hạn khi người dùng tiếp tục sử dụng ứng dụng
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;  // Cookie chỉ gửi qua HTTPS

});

// Cấu hình session cho ứng dụng
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;  // Đảm bảo cookie là HttpOnly
    options.Cookie.IsEssential = true;  // Cookie quan trọng cho ứng dụng
});

builder.Services.AddScoped<IVoucherService , VoucherService>();

// Cấu hình Authorization
builder.Services.AddAuthorization();

// Cấu hình Controllers
builder.Services.AddControllers();

// Cấu hình Swagger (Chỉ áp dụng trong môi trường phát triển)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Sử dụng session
app.UseSession();

// Cấu hình pipeline xử lý yêu cầu HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Cấu hình CORS
app.UseCors("AllowReactApp");

// Cấu hình HTTPS
app.UseHttpsRedirection();

// Cấu hình Authentication và Authorization
app.UseAuthentication(); // Xác thực người dùng
/*app.UseMiddleware<TokenValidationMiddleware>();*/
app.UseAuthorization();  // Kiểm tra quyền truy cập

// Map các controller để xử lý yêu cầu
app.MapControllers();

// Chạy ứng dụng
app.Run();
