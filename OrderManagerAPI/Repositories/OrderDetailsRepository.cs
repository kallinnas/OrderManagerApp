using Microsoft.EntityFrameworkCore;
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

        public async Task<ICollection<OrderDetailsDtoGetById>> GetByOrderId(int id)
        {
            return await context.OrderDetails
                .Where(od => od.OrderId == id)
                .Select(od => new OrderDetailsDtoGetById
                {
                    Id = od.Id,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                }).ToListAsync();
        }
    }
}
