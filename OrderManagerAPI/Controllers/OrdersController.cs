using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Services;

namespace OrderManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService service;

        public OrdersController(OrderService service) { this.service = service; }

        [HttpGet]
        public async Task<ActionResult<ICollection<OrderDtoGetAll>>> GetAll()
        {
            try
            {
                return Ok(await service.GetAllAsync());
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                return Ok(await service.DeleteAsync(id));
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Add(OrderDtoAdd order)
        {
            try
            {
                var createdOrder = await service.AddAsync(order);
                return CreatedAtAction(nameof(GetAll), new { id = createdOrder.Id }, createdOrder);
            }

            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
