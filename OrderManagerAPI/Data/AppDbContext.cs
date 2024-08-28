using Microsoft.EntityFrameworkCore;
using OrderManagerAPI.Models;

namespace OrderManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Orders)
                .WithOne(o => o.Customer).HasForeignKey(o => o.CustomerId);

            modelBuilder.Entity<Employee>()
                .HasMany(e => e.Orders)
                .WithOne(o => o.Employee).HasForeignKey(o => o.EmployeeId);

            modelBuilder.Entity<Shipper>()
                .HasMany(s => s.Orders)
                .WithOne(o => o.Shipper).HasForeignKey(s => s.ShipperId);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderDetails)
                .WithOne(od => od.Order).HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.OrderDetails)
                .WithOne(od => od.Product).HasForeignKey(pd => pd.ProductId);

            modelBuilder.Entity<Supplier>()
                .HasMany(s => s.Products)
                .WithOne(p => p.Supplier).HasForeignKey(p => p.SupplierId);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category).HasForeignKey(c => c.CategoryId);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price).HasColumnType("decimal(18,2)");
        }
    }
}
