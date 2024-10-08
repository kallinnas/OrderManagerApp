﻿using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Data;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Repositories
{
    public class OrderRepository
    {
        private readonly AppDbContext context;

        public OrderRepository(AppDbContext context) { this.context = context; }

        public async Task<ICollection<OrderDtoGetAll>> GetAllAsync()
        {
            return await context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Employee)
                .Include(o => o.Shipper)
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .Select(o => new OrderDtoGetAll
                {
                    Id = o.Id,
                    OrderDate = o.OrderDate,
                    EmployeeName = $"{o.Employee.FirstName} {o.Employee.LastName}",
                    CustomerName = o.Customer.Name,
                    ShipperName = o.Shipper.Name,
                    OrderTotalPrice = o.OrderDetails.Sum(od => od.Product.Price * od.Quantity)
                }).ToListAsync();
        }

        public async Task<Order?> GetByIdAsync(int id) { return await context.Orders.Include(o => o.OrderDetails).FirstOrDefaultAsync(o => o.Id == id); }

        public async Task<bool> DeleteAsync(Order order)
        {
            context.OrderDetails.RemoveRange(order.OrderDetails);
            context.Orders.Remove(order);
            int result = await context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Order> AddAsync(Order order)
        {
            var createdOrder = await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();
            return createdOrder.Entity;
        }

    }
}
