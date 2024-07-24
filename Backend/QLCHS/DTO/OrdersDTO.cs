namespace QLCHS.DTO
{
    public class OrdersDTO
    {
            public string Id { get; set; }
            public string CustomerId { get; set; }
            public DateTime? OrderDate { get; set; }
            public string? Address { get; set; }
            public string? Description { get; set; }
            public decimal? UnitPrice { get; set; }
            public int? Quantity { get; set; }
            public string BookId { get; set; }
            public string? BillId { get; set; }
            public string? BookImage { get; set; }
    }
    public class BillstatusDTO
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime? BillDate { get; set; }
        public decimal? TotalAmount { get; set; }
        public string PaymentStatus { get; set; }
        public string Status { get; set; }
        public List<OrdersDTO> OrderDetails { get; set; } = new List<OrdersDTO>();
    }

}
