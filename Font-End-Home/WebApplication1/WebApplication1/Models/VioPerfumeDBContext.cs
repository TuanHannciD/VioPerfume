using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using WebApplication1.Models.EF;

namespace WebApplication1.Models
{
    public class VioPerfumeDBContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VioPerfumeDBContext(DbContextOptions<VioPerfumeDBContext> options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // Hàm để thiết lập thông tin audit
        private void SetAuditFields(object entity, EntityState state)
        {
            // Lấy thông tin người dùng từ HttpContext (nếu có)
            var currentUser = _httpContextAccessor.HttpContext?.User.Identity?.Name ?? "Swagger";  // Mặc định là "Swagger"
            var currentDate = DateTime.UtcNow;

            if (state == EntityState.Added)
            {
                // Đối với entity là CMAbstract
                if (entity is CMAbstract cmAbstractEntity)
                {
                    cmAbstractEntity.CreatBy = currentUser;   // Gán giá trị CreateBy
                    cmAbstractEntity.CreatDate = currentDate;
                    cmAbstractEntity.ModifiedBy = "Chưa sửa"; // Mặc định "Chưa sửa" khi thêm mới
                    cmAbstractEntity.ModifiedDate = currentDate;
                }
                // Đối với entity là BaseUser
                else if (entity is BaseUser baseUser)
                {
                    baseUser.CreatDate = currentDate;
                    baseUser.ModifiedBy = "Chưa sửa"; // Mặc định "Chưa sửa" khi thêm mới
                    baseUser.ModifiedDate = currentDate;
                }
            }
            else if (state == EntityState.Modified)
            {
                // Đối với entity là CMAbstract
                if (entity is CMAbstract cmAbstractEntity)
                {
                    cmAbstractEntity.ModifiedBy = currentUser;  // Gán giá trị ModifiedBy là username của người dùng
                    cmAbstractEntity.ModifiedDate = currentDate;
                }
                // Đối với entity là BaseUser
                else if (entity is BaseUser baseUser)
                {
                    baseUser.ModifiedBy = currentUser ?? "Swagger"; // Gán giá trị ModifiedBy
                    baseUser.ModifiedDate = currentDate;
                }
            }
            else if (state == EntityState.Deleted)
            {
                if (entity is CMAbstract cmAbstractEntity)
                {
                    cmAbstractEntity.DeletedDate = currentDate;
                }
                else if (entity is BaseUser baseUser)
                {
                    baseUser.DeletedDate = currentDate;
                }
            }
        }


        // Override SaveChanges để thiết lập các trường audit trước khi lưu vào DB
        public override int SaveChanges()
        {
            try
            {
                var entries = ChangeTracker.Entries()
                    .Where(e => (e.Entity is CMAbstract || e.Entity is BaseUser) &&
                                (e.State == EntityState.Added || e.State == EntityState.Modified || e.State == EntityState.Deleted));

                // Duyệt qua các entity cần xử lý
                foreach (var entry in entries)
                {
                    // Gọi SetAuditFields cho mỗi entity, truyền vào trạng thái (Add/Modified)
                    SetAuditFields(entry.Entity, entry.State);
                }

                // Gọi phương thức cơ sở để thực hiện lưu thay đổi vào DB
                return base.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Lỗi khi lưu thay đổi: {ex.Message}");
                throw new Exception("Đã xảy ra lỗi khi lưu thay đổi dữ liệu.", ex);
            }
        }


        // Override SaveChangesAsync để hỗ trợ xử lý bất đồng bộ
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                var entries = ChangeTracker.Entries()
                    .Where(e => (e.Entity is CMAbstract || e.Entity is BaseUser) &&
                                (e.State == EntityState.Added || e.State == EntityState.Modified || e.State == EntityState.Deleted));

                // Duyệt qua các entity cần xử lý
                foreach (var entry in entries)
                {
                    // Gọi SetAuditFields cho mỗi entity, truyền vào trạng thái (Add/Modified)
                    SetAuditFields(entry.Entity, entry.State);
                }

                // Gọi phương thức cơ sở để thực hiện lưu thay đổi vào DB (bất đồng bộ)
                return await base.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Lỗi khi lưu thay đổi: {ex.Message}");
                throw new Exception("Đã xảy ra lỗi khi lưu thay đổi dữ liệu.", ex);
            }
        }


        // Các DbSet khác cho các thực thể trong hệ thống
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

        // Đảm bảo gọi base method trong OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
