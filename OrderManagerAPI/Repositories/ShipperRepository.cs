using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class ShipperRepository
    {
        private readonly AppDbContext context;

        public ShipperRepository(AppDbContext context) { this.context = context; }

        public async Task<ICollection<ShipperDtoGetDdl>> GetShippersDdlAsync()
        {
            return await context.Shippers.Select(s => new ShipperDtoGetDdl { Id = s.Id, Name = s.Name, }).ToListAsync();
        }
    }
}
