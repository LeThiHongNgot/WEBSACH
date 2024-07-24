using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Bill
    {
        public Bill()
        {
            Orders = new HashSet<Order>();
        }

        public string Id { get; set; } = null!;
        public string? UserId { get; set; }
        public string? VoucherId { get; set; }
        public DateTime? BillDate { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public string? Status { get; set; }

        public virtual User? User { get; set; }
        public virtual Voucher? Voucher { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
