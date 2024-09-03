using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OrderManagerAPI.Models
{
    public class OrderDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public OrderDetails() { }
        public OrderDetails(int OrderID, int ProductID, int Quantity)
        {
            this.OrderId = OrderID;
            this.ProductId = ProductID;
            this.Quantity = Quantity;
        }
    }

    public class OrderDetailsDtoAddOrder
    {
        public int OrderId { get; set; }
        public ProductDtoAddOrder Product { get; set; } = new ProductDtoAddOrder();
        public int Quantity { get; set; }
    }
}
