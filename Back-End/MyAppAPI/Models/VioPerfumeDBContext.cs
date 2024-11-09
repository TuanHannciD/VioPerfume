using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebOnline.Models.EF;

namespace WebOnline.Models
{
    public class VioPerfumeDBContext : IdentityDbContext<ApplicationUser>
    {
        public VioPerfumeDBContext() { }
        public VioPerfumeDBContext(DbContextOptions<VioPerfumeDBContext> options) : base(options) { }

        public DbSet<Ads> adv { get; set; }
        public DbSet<ApplicationUser> user { get; set; }
        public DbSet<Branch> branches { get; set; }
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
