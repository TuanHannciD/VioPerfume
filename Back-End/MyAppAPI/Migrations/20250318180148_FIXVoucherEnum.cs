using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class FIXVoucherEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FixedDiscount",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "PercentageDiscount",
                table: "tb_Voucher");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "tb_Voucher",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d25f6155-7074-46c1-b3a9-8c15a7c44717", new DateTime(2025, 3, 18, 18, 1, 47, 661, DateTimeKind.Utc).AddTicks(6032), "AQAAAAIAAYagAAAAECHy5KA7XqcAKwFZl1g/WCzpI+hMEuSIhzEADEMIMxvMKHChwixjrx4oCT+7GTCbnw==", "486ed5f2-3fec-433d-882e-85641b17a744" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
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
    }
}
