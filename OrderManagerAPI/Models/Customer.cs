using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderManagerAPI.Models
{
    public class Customer
    {
        [Key][DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact {  get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int Postcode { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }

    public class CustomerDtoGetDdl
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
