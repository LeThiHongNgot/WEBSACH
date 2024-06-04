using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class ProductReview
    {
        public string Id { get; set; } = null!;
        public string CustomerId { get; set; } = null!;
        public string BookId { get; set; } = null!;
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime? NgayCommemt { get; set; }

        public virtual Book? Book { get; set; } 
        public virtual Customer? Customer { get; set; }
    }
}
