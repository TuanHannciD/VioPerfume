using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tb_SanPham",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AddColumn<string>(
                name: "FragranceGroup",
                table: "tb_SanPham",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameProducts",
                table: "tb_SanPham",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Style",
                table: "tb_SanPham",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FragranceGroup",
                table: "tb_SanPham");

            migrationBuilder.DropColumn(
                name: "NameProducts",
                table: "tb_SanPham");

            migrationBuilder.DropColumn(
                name: "Style",
                table: "tb_SanPham");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tb_SanPham",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
