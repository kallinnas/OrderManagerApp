using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerRepository repository;

        public CustomersController(CustomerRepository repository) { this.repository = repository; }


        [HttpGet("Ddl")]
        public async Task<ActionResult<ICollection<CustomerDtoGetDdl>>> GetCustomersDdl()
        {
            try
            {
                return Ok(await repository.GetCustomersDdlAsync());
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
