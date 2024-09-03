using Microsoft.AspNetCore.Mvc;
using OrderManagerAPI.Models;
using OrderManagerAPI.Repositories;

namespace OrderManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeRepository employeeRepository;

        public EmployeesController(EmployeeRepository employeeRepository) { this.employeeRepository = employeeRepository; }

        [HttpGet("Ddl")]
        public async Task<ActionResult<ICollection<EmployeeDtoGetDdl>>> GetEmployeesDdlAsync()
        {
            return Ok(await employeeRepository.GetEmployeesDdlAsync());
        }
    }
}
