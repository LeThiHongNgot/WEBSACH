using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Author
    {
        public Author()
        {
            Books = new HashSet<Book>();
        }

        public string Id { get; set; } = null!;
        public string? Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}
