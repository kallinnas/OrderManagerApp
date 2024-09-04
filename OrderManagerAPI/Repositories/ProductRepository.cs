using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class ProductRepository
    {
        private readonly AppDbContext context;

        public ProductRepository(AppDbContext context) { this.context = context; }

        public async Task<ICollection<ProductDto>> GetProductsDdlAsync()
        {
            return await context.Products.Select(p => new ProductDto { Id = p.Id, Name = p.Name, Price = p.Price }).ToListAsync();
        }
    }
}
