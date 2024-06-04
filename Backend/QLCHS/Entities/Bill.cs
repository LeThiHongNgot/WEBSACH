using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Bill
    {
        public string Id { get; set; } = null!;
        public string OrderId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string VoucherId { get; set; } = null!;
        public DateTime? BillDate { get; set; }
        public decimal? TotalAmount { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual Voucher Voucher { get; set; } = null!;
    }
}
