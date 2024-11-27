using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyAppAPI.Models.EF;
using WebOnline.Models.EF;

namespace WebOnline.Models
{
    public class VioPerfumeDBContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VioPerfumeDBContext() { }
        public VioPerfumeDBContext(DbContextOptions<VioPerfumeDBContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private void SetAuditFields(object entity, EntityState state)
        {
            var currentUser = _httpContextAccessor.HttpContext?.User.Identity?.Name ?? "System"; // Giá trị mặc định là "System"
            var currentDate = DateTime.UtcNow;

            if (state == EntityState.Added)
            {
                if (entity is CMAbstract cmAbstractEntity)
                {
                    cmAbstractEntity.CreatBy = currentUser;
                    cmAbstractEntity.CreatDate = currentDate;
                }
                else if (entity is BaseUser baseUser)
                {
                    baseUser.CreatDate = currentDate;
                }
            }
            else if (state == EntityState.Modified)
            {
                if (entity is CMAbstract cmAbstractEntity)
                {
                    cmAbstractEntity.ModifiedBy = currentUser;
                    cmAbstractEntity.ModifiedDate = currentDate;
                }
                else if (entity is BaseUser baseUser)
                {
                    baseUser.ModifiedBy = currentUser ?? "System"; // Gán giá trị mặc định nếu currentUser bị null
                    baseUser.ModifiedDate = currentDate;
                }
            }
        }


        public override int SaveChanges()
        {
            try
            {
                var entries = ChangeTracker.Entries()
                    .Where(e => (e.Entity is CMAbstract || e.Entity is BaseUser) &&
                                (e.State == EntityState.Added || e.State == EntityState.Modified));

                foreach (var entry in entries)
                {
                    SetAuditFields(entry.Entity, entry.State);
                }

                // Lấy thông tin người dùng hiện tại và ghi log
                var currentUser = _httpContextAccessor.HttpContext?.User.Identity?.Name ?? "System";
                Console.WriteLine($"Current User: {currentUser}");  // Ghi thông tin người dùng ra Console (hoặc sử dụng logger)

                return base.SaveChanges();
            }
            catch (Exception ex)
            {
                // Ghi lỗi nếu có
                Console.Error.WriteLine($"Lỗi khi lưu thay đổi: {ex.Message}");
                throw new Exception("Đã xảy ra lỗi khi lưu thay đổi dữ liệu.", ex);
            }
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var currentUserName = "System"; // Giá trị mặc định nếu không có người dùng đăng nhập

            if (_httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false)
            {
                currentUserName = _httpContextAccessor.HttpContext.User.Identity.Name ?? "System";
            }

            foreach (var entry in ChangeTracker.Entries<BaseUser>())
            {
                if (entry.State == EntityState.Added)
                {
                    
                    entry.Entity.CreatDate = DateTime.UtcNow;
                    entry.Entity.ModifiedBy = currentUserName;
                    entry.Entity.ModifiedDate = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.ModifiedBy = currentUserName;
                    entry.Entity.ModifiedDate = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }


        public DbSet<Ads> adv { get; set; }
        public DbSet<ApplicationUser> user { get; set; }
        public DbSet<Brand> branches { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<CartItem> cartItems { get; set; }
        public DbSet<Categorys> categorie { get; set; }
        public DbSet<Contacts> contacts { get; set; }
        public DbSet<News> news { get; set; }
        public DbSet<OderItem> oderItems { get; set; }
        public DbSet<Oders> oders { get; set; }
        public DbSet<Posts> posts { get; set; }
        public DbSet<ProductCategorys> productCategories { get; set; }
        public DbSet<Products> products { get; set; }
        public DbSet<SystemSettings> systemSettings { get; set; }
        public DbSet<ProductImage> productImage { get; set; }
        public DbSet<Voucher> voucher { get; set; }
        public DbSet<OrderVoucher> orderVoucher { get; set; }
        public DbSet<ProductVoucher> productVoucher { get; set; }
        public DbSet<UserVoucher> userVoucher { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Đảm bảo gọi base method 
        }
    }
}
