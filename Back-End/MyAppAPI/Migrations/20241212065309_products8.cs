using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class products8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCategory",
                table: "tb_SanPham");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductCategory",
                table: "tb_SanPham",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
