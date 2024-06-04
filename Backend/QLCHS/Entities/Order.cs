using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Order
    {
        public Order()
        {
            Bills = new HashSet<Bill>();
        }

        public string Id { get; set; } = null!;
        public string CustomerId { get; set; } = null!;
        public DateTime? OrderDate { get; set; }
        public byte? Status { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public string BookId { get; set; } = null!;

        public virtual Book? Book { get; set; } 
        public virtual Customer? Customer { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
    }
    public class OrderWithDetails
    {
        public string Id { get; set; }
        public string Phone { get; set; }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime? OrderDate { get; set; }
        public byte? Status { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public string BookName { get; set; }
    }

}
