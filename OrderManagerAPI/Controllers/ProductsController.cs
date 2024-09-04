using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductRepository productRepository;

        public ProductsController(ProductRepository productRepository) { this.productRepository = productRepository; }

        [HttpGet("Ddl")]
        public async Task<ActionResult<ICollection<ProductDto>>> GetProductsDdl()
        {
            try
            {
                return Ok(await productRepository.GetProductsDdlAsync());
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
