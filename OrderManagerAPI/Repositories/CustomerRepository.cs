using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class CustomerRepository
    {
        private readonly AppDbContext context;

        public CustomerRepository(AppDbContext context) { this.context = context; }

        public async Task<ICollection<CustomerDtoGetDdl>> GetCustomersDdlAsync()
        {
            return await context.Customers.Select(c => new CustomerDtoGetDdl { Id = c.Id, Name = c.Name }).ToListAsync();
        }
    }
}
