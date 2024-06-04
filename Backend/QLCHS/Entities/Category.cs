using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Category
    {
        public Category()
        {
            Bookdetails = new HashSet<Bookdetail>();
        }

        public string Id { get; set; } = null!;
        public string? Name { get; set; }

        public virtual ICollection<Bookdetail> Bookdetails { get; set; }
    }
}
