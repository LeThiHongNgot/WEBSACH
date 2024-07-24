using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Otp
    {
        public string Email { get; set; } = null!;
        public string Otpcode { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
