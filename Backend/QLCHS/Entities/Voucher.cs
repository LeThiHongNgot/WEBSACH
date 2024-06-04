using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Voucher
    {
        public Voucher()
        {
            Bills = new HashSet<Bill>();
        }

        public string Id { get; set; } = null!;
        public int? Quantity { get; set; }
        public decimal? PercentDiscount { get; set; }
        public decimal? MaxDiscount { get; set; }
        public DateTime? DateBegin { get; set; }
        public DateTime? DateEnd { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
