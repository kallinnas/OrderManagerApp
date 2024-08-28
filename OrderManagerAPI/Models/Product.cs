using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OrderManagerAPI.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int SupplierId { get; set; }
        public int CategoryId { get; set; }
        public Supplier Supplier { get; set; }
        public Category Category { get; set; }
        public int Unit { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
