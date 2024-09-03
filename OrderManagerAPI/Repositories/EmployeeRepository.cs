using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class EmployeeRepository
    {
        private readonly AppDbContext context;

        public EmployeeRepository(AppDbContext context) { this.context = context; }

        public async Task<ICollection<EmployeeDtoGetDdl>> GetEmployeesDdlAsync()
        {
            return await context.Employees.Select(e => new EmployeeDtoGetDdl { Id = e.Id, FullName = e.FirstName + " " + e.LastName }).ToListAsync();
        }
    }
}
