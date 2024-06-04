using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Userrole
    {
        public string Id { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string RoleId { get; set; } = null!;

        public virtual Role Role { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
