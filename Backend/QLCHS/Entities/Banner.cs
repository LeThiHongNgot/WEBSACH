using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Banner
    {
        public string Id { get; set; } = null!;
        public string? Image { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
