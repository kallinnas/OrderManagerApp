using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippersController : ControllerBase
    {
        private readonly ShipperRepository shipperRepository;

        public ShippersController(ShipperRepository shipperRepository) { this.shipperRepository = shipperRepository; }

        [HttpGet("Ddl")]
        public async Task<ActionResult<ICollection<ShipperDtoGetDdl>>> GetShippersDdl()
        {
            return Ok(await shipperRepository.GetShippersDdlAsync());
        }
    }
}
