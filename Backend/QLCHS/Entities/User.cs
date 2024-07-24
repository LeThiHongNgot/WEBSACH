using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class User
    {
        public User()
        {
            Bills = new HashSet<Bill>();
        }

        public string Id { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Email { get; set; }
        public string Phone { get; set; } = null!;
        public string? Role { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
