using Microsoft.AspNetCore.Mvc;
using MyAppAPI.Interface;
using static MyAppAPI.DTO.VoucherRequestDto;

namespace MyAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController : ControllerBase
    {
         private readonly IVoucherService _voucherService;
        public VouchersController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GellAllVoucher()
        {
            var vouchers = await _voucherService.GetAllVouchersAsync();
            return Ok(vouchers);
        }

        [HttpGet("getby/{id}")]
        public async Task<IActionResult> GetVoucherByIDAsync(int id)
        {
            var voucher = await _voucherService.GetVoucherByIdAsync(id);
            if (voucher == null)
            {
                return NotFound(new { mesaage = "Voucher không tồn tại" });
            }
            return Ok(voucher);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateVoucher([FromBody] AddVoucherRequest addVoucherRequest)
        {
            var result = await _voucherService.CreateVoucherAsync(addVoucherRequest);
            if (result)
            {
                return Ok(new { message = "Voucher created successfully!" });
            }
            else
            {
                return BadRequest(new { message = "Failed to create voucher. Code might be duplicated." });
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateVoucher(int id, [FromBody] UpdateVoucherDto dto)
        {
            var result = await _voucherService.UpdateVoucherAsync(id, dto);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Message);
        }

    }

}
