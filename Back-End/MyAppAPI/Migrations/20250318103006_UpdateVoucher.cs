using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVoucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatBy",
                table: "tb_Voucher",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatDate",
                table: "tb_Voucher",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                table: "tb_Voucher",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tb_Voucher",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "tb_Voucher",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "tb_Voucher",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "28b837f4-bde1-44c9-8311-4f3ad005b183", new DateTime(2025, 3, 18, 10, 30, 5, 457, DateTimeKind.Utc).AddTicks(8391), "AQAAAAIAAYagAAAAEBYu8kkssfqxCjORDwdj8T5j7uRrUCEGBf+QgEFK6vgm+FMkegoOiCBTwC2T7okEWg==", "033c67f7-83c5-456c-b7ac-85ebf3d7da4b" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatBy",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "CreatDate",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "tb_Voucher");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "tb_Voucher");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin-id",
                columns: new[] { "ConcurrencyStamp", "CreatDate", "PasswordHash", "SecurityStamp" },
                values: new object[] { "23083492-a284-4331-895c-400bba934fa4", new DateTime(2025, 3, 18, 10, 27, 40, 343, DateTimeKind.Utc).AddTicks(1809), "AQAAAAIAAYagAAAAENIZj/n4H/0zBWmLlA6MDc5ky91OMUb0mP8beWmZcqeBE5OequCHiYEZUe6DfGbfig==", "2f4fe12d-d345-4526-baf6-ecde2735a7fe" });
        }
    }
}
