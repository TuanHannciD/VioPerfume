using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVoucherV34 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiscountValue",
                table: "tb_Voucher",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2d89b063-8f25-43b4-9344-51c11704fd20", new DateTime(2025, 3, 22, 11, 42, 23, 983, DateTimeKind.Utc).AddTicks(4303), "AQAAAAIAAYagAAAAEFKc12uxVCVrSZA5ZXXLkxgsgZ+3CJ67cVMzkfYpAfhhl80iiFynLSmJlwYzzMvTtg==", "3f093846-bead-4549-93e3-346c1e76f516" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountValue",
                table: "tb_Voucher");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "76de54ec-70a0-42e1-af69-85b319ee4be8", new DateTime(2025, 3, 22, 10, 31, 53, 488, DateTimeKind.Utc).AddTicks(6058), "AQAAAAIAAYagAAAAELxMce+L6oWsq0YsG1JNpVZsuHJmqb15PxPS9isiuVG8b3IWUyDrG/MU0KUQXAwH3Q==", "e2c613ec-6a3f-48bf-8316-3f9c65b80da9" });
        }
    }
}
