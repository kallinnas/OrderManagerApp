using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderDetailsController : ControllerBase
{
    private readonly OrderDetailsRepository orderDetailsRepository;

    public OrderDetailsController(OrderDetailsRepository _orderDetailsRepository) { orderDetailsRepository = _orderDetailsRepository; }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ICollection<OrderDetailsDtoGetById>>> GetByOrderId(int id)
    {
        try
        {
            return Ok(await orderDetailsRepository.GetByOrderId(id));
        }

        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

