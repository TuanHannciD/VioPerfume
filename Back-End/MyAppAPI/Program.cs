using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.DTO;
using System;
using WebOnline.Models;
using WebOnline.Models.EF;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MyAppAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<VioPerfumeDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("VioPerfumeDB")));

// Cấu hình Identity    
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<VioPerfumeDBContext>()
    .AddDefaultTokenProviders();


builder.Services.AddHttpContextAccessor();


//Cấu hình để chạy Fe qua localhost
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowCredentials()
              .AllowAnyMethod()
              .AllowCredentials();

    });
});

//Cấu hình để chạy Fe qua localhost
// Đọc cấu hình JWT từ appsettings.json
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
builder.Services.AddSingleton(jwtSettings);

// Cấu hình Authentication
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});



builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
    options.Cookie.SameSite = SameSiteMode.None;
    //Ví dụ: / api / auth / login là API đăng nhập. Khi người dùng chưa đăng nhập, họ sẽ được chuyển đến URL này.
    options.SlidingExpiration = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
});

// Cấu hình session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseSession();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
//Theem xacs thuwcj
app.UseAuthentication();

//Thêm middleware  kiểm tra token
app.UseMiddleware<TokenValidationMiddleware>();
//Thêm phần chạy cho FE

//app.UseMiddleware<RoleAuthorizationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
