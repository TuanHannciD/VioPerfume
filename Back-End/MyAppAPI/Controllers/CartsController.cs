using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebOnline.Models;
using WebOnline.Models.EF;
using static MyAppAPI.DTO.CartRequestDto;

namespace MyAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly VioPerfumeDBContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartsController(VioPerfumeDBContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        // ✅ Hàm tái sử dụng để lấy UserId từ NameIdentifier
        private async Task<string?> GetUserIdFromToken()
        {
            var currentUserClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            if (currentUserClaim == null) return null;

            var username = currentUserClaim.Value;
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == username);
            return user?.Id;
        }

        [HttpGet("getCart")]
        public async Task<IActionResult> GetCart()
        {
            var userId = await GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var cart = await _dbContext.carts
                .Include(c => c.cartItems)
                .ThenInclude(ci => ci.Products)
                .FirstOrDefaultAsync(c => c.UserID == userId);

            if (cart == null)
                return NotFound(new { message = "Cart not found" });

            var cartDto = new
            {
                cartId = cart.Id,
                cartItems = cart.cartItems.Select(ci => new
                {
                    cartItemId = ci.Id,
                    productId = ci.ProductId,
                    productName = ci.Products.NameProducts,
                    productPrice = ci.Products.Price,
                    quantity = ci.Quantity
                })
            };

            return Ok(cartDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddProductToCartRequest request)
        {
            var userId = await GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var cart = await _dbContext.carts.FirstOrDefaultAsync(c => c.UserID == userId);
            if (cart == null)
            {
                cart = new Cart { UserID = userId };
                _dbContext.carts.Add(cart);
                await _dbContext.SaveChangesAsync();
            }

            var product = await _dbContext.products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            if (product.Quantity <= 0)
                return BadRequest(new { message = "Product is out of stock" });

            var existingItem = await _dbContext.cartItems.FirstOrDefaultAsync(
                ci => ci.CartId == cart.Id && ci.ProductId == request.ProductId
            );

            if (existingItem != null)
            {
                if (existingItem.Quantity + request.Quantity > product.Quantity)
                {
                    return BadRequest(new { message = "Số lượng sản phẩm " + request.Quantity + "Cái , Vượt quá số lượng trong kho" });
                }
                existingItem.Quantity += request.Quantity;
            }
            else
            {
                if (request.Quantity > product.Quantity)
                {
                    return BadRequest(new { message = "Số lượng sản phẩm " + request.Quantity + "Cái , Vượt quá số lượng trong kho" });
                }
                var cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                };
                _dbContext.cartItems.Add(cartItem);
            }

            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Product added to cart successfully", cartId = cart.Id });
        }

        [HttpPost("increaseQuantity")]
        public async Task<IActionResult> IncreaseQuantity([FromBody] CartItemUpdateRequest request)
        {
            var userId = await GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var cart = await _dbContext.carts.FirstOrDefaultAsync(c => c.UserID == userId);
            if (cart == null)
                return NotFound(new { message = "Cart not found" });

            var existingItem = await _dbContext.cartItems.FirstOrDefaultAsync(
                ci => ci.CartId == cart.Id && ci.ProductId == request.ProductID
            );

            if (existingItem == null)
                return NotFound(new { message = "Item not found in the cart" });

            var product = await _dbContext.products.FindAsync(request.ProductID);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            if (existingItem.Quantity + request.QuantityChange > product.Quantity)
                return BadRequest(new { message = "Cannot exceed available product quantity" });

            existingItem.Quantity += request.QuantityChange;
            _dbContext.cartItems.Update(existingItem);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Quantity increased successfully" });
        }

        [HttpPost("decreaseQuantity")]
        public async Task<IActionResult> DecreaseQuantity([FromBody] CartItemUpdateRequest request)
        {
            var userId = await GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var cart = await _dbContext.carts.FirstOrDefaultAsync(c => c.UserID == userId);
            if (cart == null)
                return NotFound(new { message = "Cart not found" });

            var existingItem = await _dbContext.cartItems.FirstOrDefaultAsync(
                ci => ci.CartId == cart.Id && ci.ProductId == request.ProductID
            );

            if (existingItem == null)
                return NotFound(new { message = "Item not found in the cart" });

            if (existingItem.Quantity + request.QuantityChange < 1)
                return BadRequest(new { message = "Quantity cannot be less than 1" });

            existingItem.Quantity -= request.QuantityChange;
            _dbContext.cartItems.Update(existingItem);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Quantity decreased successfully" });
        }

        [HttpDelete("remove/{itemID}")]
        public async Task<IActionResult> RemoveFromCart(int itemID)
        {
            var userId = await GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { message = "User not authenticated" });

            var item = await _dbContext.cartItems.FindAsync(itemID);
            if (item == null)
                return NotFound(new { message = "Item not found" });

            _dbContext.cartItems.Remove(item);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Item removed successfully" });
        }
    }
}
