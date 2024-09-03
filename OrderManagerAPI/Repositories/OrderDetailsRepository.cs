using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class OrderDetailsRepository
    {
        private readonly AppDbContext context;

        public OrderDetailsRepository(AppDbContext context) { this.context = context; }

        public async Task<bool> AddAsync(List<OrderDetails> orderDetails)
        {
            context.OrderDetails.AddRange(orderDetails);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
