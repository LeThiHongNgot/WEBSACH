using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            ProductReviews = new HashSet<ProductReview>();
        }

        public string Id { get; set; } = null!;
        public string? FullName { get; set; }
        public string? Photo { get; set; }
        public bool? Activated { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Phone { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
    }
}
