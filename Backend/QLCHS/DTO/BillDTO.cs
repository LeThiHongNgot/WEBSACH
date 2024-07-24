namespace QLCHS.DTO
{
    public class BillDTO
    {
            public string Id { get; set; } = null!;
            public string? UserId { get; set; }
            public string? VoucherId { get; set; }
            public DateTime? BillDate { get; set; }
            public decimal? TotalAmount { get; set; }
            public string? PaymentStatus { get; set; }
            public string Status { get; set; } 
    }
    public class BillWithCustomerDTO
    {
        public string Id { get; set; } = null!;
        public string? UserId { get; set; }
        public string? VoucherId { get; set; }
        public string CustomerName { get; set; }
        public DateTime? OrderDate { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public string Status { get; set; }
    }
    public class BillWithOrdersDTO
    {
        public string Id { get; set; } = null!;
        public string? UserId { get; set; }
        public string? NameUser { get; set; }
        public string? VoucherId { get; set; }
        public DateTime? BillDate { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public string Status { get; set; }
        public string CustomerId { get; set; }
        public string NameCustomer { get; set; }
        public string PhoneNumber { get; set; } // Add PhoneNumber property
        public DateTime? OrderDate { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public string BookId { get; set; }
        public string NameBook { get; set; }
    }

}
