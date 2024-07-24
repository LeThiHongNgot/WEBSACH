using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Order
    {
        public string Id { get; set; } = null!;
        public string CustomerId { get; set; } = null!;
        public DateTime? OrderDate { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public string BookId { get; set; } = null!;
        public string BillId { get; set; } = null!;

        public virtual Bill Bill { get; set; } = null!;
        public virtual Book Book { get; set; } = null!;
        public virtual Customer Customer { get; set; } = null!;
    }
}
