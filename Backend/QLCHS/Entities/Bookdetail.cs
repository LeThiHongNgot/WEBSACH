using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Bookdetail
    {
        public string BookId { get; set; } = null!;
        public string CategoryId { get; set; } = null!;
        public string? Dimensions { get; set; }
        public int? Pages { get; set; }
        public string? Description { get; set; }

        public virtual Book? Book { get; set; } 
        public virtual Category? Category { get; set; } 
    }
}
