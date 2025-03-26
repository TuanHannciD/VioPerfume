using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddQuantityVoucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "tb_Voucher",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "23083492-a284-4331-895c-400bba934fa4", new DateTime(2025, 3, 18, 10, 27, 40, 343, DateTimeKind.Utc).AddTicks(1809), "AQAAAAIAAYagAAAAENIZj/n4H/0zBWmLlA6MDc5ky91OMUb0mP8beWmZcqeBE5OequCHiYEZUe6DfGbfig==", "2f4fe12d-d345-4526-baf6-ecde2735a7fe" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "tb_Voucher");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "36370177-db91-425c-a1c3-94d15dfb0067", new DateTime(2025, 3, 1, 10, 20, 2, 923, DateTimeKind.Utc).AddTicks(7954), "AQAAAAIAAYagAAAAEHhAQsIAbG2jov+NLebdwAhwgTbHhtJKjvoWheNpWv/kc5CBoOHVlxWuS6XbPUbbtw==", "e1dd702f-2fcf-46fa-a31f-12b6e026da1f" });
        }
    }
}
