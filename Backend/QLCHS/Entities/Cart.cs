using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Cart
    {
        public string Id { get; set; } = null!;
        public string BookId { get; set; } = null!;
        public string CustomerId { get; set; } = null!;

        public virtual Book? Book { get; set; } 
        public virtual Customer? Customer { get; set; } 
    }
}
