namespace QLCHS.Entities
{
    public class BookDetailsViewModel
    {
        public string BookId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string AuthorId { get; set; }
        public string SupplierName { get; set; }
        public string Supplierid { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? PricePercent { get; set; }
        public int? PublishYear { get; set; }
        public bool? Available { get; set; }
        public int? Quantity { get; set; }
        public string CatergoryID { get; set; }
        public string CategoryName { get; set; }
        public string Dimensions { get; set; }
        public int? Pages { get; set; }
        public string Description { get; set; }
        public string Image0 { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
    }
    public class BookAvgPView
    {
        public string BookId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
       
        public string SupplierName { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? PricePercent { get; set; }
        public int? PublishYear { get; set; }
        public bool? Available { get; set; }
        public int? Quantity { get; set; }
        public string CatergoryID { get; set; }
        public string CategoryName { get; set; }
        public string Dimensions { get; set; }
        public int? Pages { get; set; }
        public string Description { get; set; }
        public double AverageRating { get; set; } // Corrected syntax
        public string Image0 { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
    }
    public class ShoppingCartItem
    {
        public byte? status { get; set; }
        public string Description { get; set; }
        public List<string> Image0 { get; set; } = new List<string>();
        public List<string> Title { get; set; } = new List<string>();
        public List<string> Price { get; set; } = new List<string>(); 
        public List<string> Quantity { get; set; } = new List<string>();
        public List<string> BookIds { get; set; } = new List<string>(); // List to store BookIds
                                                                        // Add other properties as needed
    }

    public class ProductReviewDTO
    {
        public string Id { get; set; }
        public string CustomerName { get; set; }
        public string BookTitle { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime? NgayComment { get; set; }
    }


   


}
