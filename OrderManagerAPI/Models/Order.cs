using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderManagerAPI.Models;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public int EmployeeId { get; set; }
    public int ShipperId { get; set; }
    public Customer Customer { get; set; }
    public Employee Employee { get; set; }
    public Shipper Shipper { get; set; }
    public DateTime OrderDate { get; set; }
    public virtual ICollection<OrderDetails> OrderDetails { get; set; }
}

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
}

public class OrderDtoAdd : OrderDto
{
    public int CustomerId { get; set; }
    public int EmployeeId { get; set; }
    public int ShipperId { get; set; }
    public virtual ICollection<OrderDetailsDtoAddOrder> OrderDetails { get; set; }
}

public class OrderDtoGetAll : OrderDto
{
    public string EmployeeName { get; set; }
    public string CustomerName { get; set; }
    public string ShipperName { get; set; }
    public decimal OrderTotalPrice { get; set; }
}
