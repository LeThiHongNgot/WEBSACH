namespace QLCHS.DTO
{
    public class ProductReviewtOTP
    {
        public string CustomerId { get; set; } = null!;
        public string BookId { get; set; } = null!;
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime? NgayCommemt { get; set; }
    }

}
