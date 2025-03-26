using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVoucherV33 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGlobal",
                table: "tb_Voucher",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "76de54ec-70a0-42e1-af69-85b319ee4be8", new DateTime(2025, 3, 22, 10, 31, 53, 488, DateTimeKind.Utc).AddTicks(6058), "AQAAAAIAAYagAAAAELxMce+L6oWsq0YsG1JNpVZsuHJmqb15PxPS9isiuVG8b3IWUyDrG/MU0KUQXAwH3Q==", "e2c613ec-6a3f-48bf-8316-3f9c65b80da9" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGlobal",
                table: "tb_Voucher");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d25f6155-7074-46c1-b3a9-8c15a7c44717", new DateTime(2025, 3, 18, 18, 1, 47, 661, DateTimeKind.Utc).AddTicks(6032), "AQAAAAIAAYagAAAAECHy5KA7XqcAKwFZl1g/WCzpI+hMEuSIhzEADEMIMxvMKHChwixjrx4oCT+7GTCbnw==", "486ed5f2-3fec-433d-882e-85641b17a744" });
        }
    }
}
