using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class FIXVoucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountValue",
                table: "tb_Voucher");

            migrationBuilder.AddColumn<decimal>(
                name: "FixedDiscount",
                table: "tb_Voucher",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PercentageDiscount",
                table: "tb_Voucher",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "deb07851-e18c-4268-bf70-4cd0a2f6e63a", new DateTime(2025, 3, 18, 17, 53, 14, 40, DateTimeKind.Utc).AddTicks(8537), "AQAAAAIAAYagAAAAEM/QcuXrKLWgEStbr7vPercmziMqm34xuvCZh6xKfLC4OIzUI7ZRIbl8Ac8n4LdXDg==", "487e0328-0377-480d-b760-b5b88c75c3a7" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FixedDiscount",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "PercentageDiscount",
                table: "tb_Voucher");

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
                values: new object[] { "28b837f4-bde1-44c9-8311-4f3ad005b183", new DateTime(2025, 3, 18, 10, 30, 5, 457, DateTimeKind.Utc).AddTicks(8391), "AQAAAAIAAYagAAAAEBYu8kkssfqxCjORDwdj8T5j7uRrUCEGBf+QgEFK6vgm+FMkegoOiCBTwC2T7okEWg==", "033c67f7-83c5-456c-b7ac-85ebf3d7da4b" });
        }
    }
}
