using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Bookimg
    {
        public string BookId { get; set; } = null!;
        public string? Image0 { get; set; }
        public string? Image1 { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }

        public virtual Book? Book { get; set; } 
    }
}
