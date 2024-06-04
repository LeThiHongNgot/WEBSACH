using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Role
    {
        public Role()
        {
            Userroles = new HashSet<Userrole>();
        }

        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Mission { get; set; }

        public virtual ICollection<Userrole> Userroles { get; set; }
    }
}
