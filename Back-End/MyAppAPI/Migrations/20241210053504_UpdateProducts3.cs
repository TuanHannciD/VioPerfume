using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProducts3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_SanPham_tb.ThuongHieu_BranchId",
                table: "tb_SanPham");

            migrationBuilder.RenameColumn(
                name: "BranchId",
                table: "tb_SanPham",
                newName: "BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_tb_SanPham_BranchId",
                table: "tb_SanPham",
                newName: "IX_tb_SanPham_BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_SanPham_tb.ThuongHieu_BrandId",
                table: "tb_SanPham",
                column: "BrandId",
                principalTable: "tb.ThuongHieu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_SanPham_tb.ThuongHieu_BrandId",
                table: "tb_SanPham");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "tb_SanPham",
                newName: "BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_tb_SanPham_BrandId",
                table: "tb_SanPham",
                newName: "IX_tb_SanPham_BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_SanPham_tb.ThuongHieu_BranchId",
                table: "tb_SanPham",
                column: "BranchId",
                principalTable: "tb.ThuongHieu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
