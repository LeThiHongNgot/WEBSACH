using System;
using System.Collections.Generic;

namespace QLCHS.Entities
{
    public partial class Book
    {
        public Book()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            ProductReviews = new HashSet<ProductReview>();
        }

        public string Id { get; set; } = null!;
        public string? Title { get; set; }
        public string AuthorId { get; set; } = null!;
        public string SupplierId { get; set; } = null!;
        public decimal? UnitPrice { get; set; }
        public decimal? PricePercent { get; set; }
        public int? PublishYear { get; set; }
        public bool? Available { get; set; }
        public int? Quantity { get; set; }

        public virtual Author? Author { get; set; }
        public virtual Supplier? Supplier { get; set; }
        public virtual Bookdetail? Bookdetail { get; set; }
        public virtual Bookimg? Bookimg { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductReview> ProductReviews { get; set; }
    }
}
