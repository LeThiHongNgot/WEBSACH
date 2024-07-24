namespace QLCHS.DTO
{
    public class AuthorDTO
    {
        public string? id { get; set; } 
        public string name { get; set; }
        public string description { get; set; }
        public IFormFile image { get; set; }
    }
}
