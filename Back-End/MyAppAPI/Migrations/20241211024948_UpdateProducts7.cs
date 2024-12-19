using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProducts7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "tb_DanhMucSanPham");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tb_DanhMucSanPham",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "tb_DanhMucSanPham",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "tb_DanhMucSanPham");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tb_DanhMucSanPham",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tb_DanhMucSanPham",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
