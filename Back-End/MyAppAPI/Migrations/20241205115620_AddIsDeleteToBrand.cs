using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDeleteToBrand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "tb.ThuongHieu",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "tb.ThuongHieu");
        }
    }
}
