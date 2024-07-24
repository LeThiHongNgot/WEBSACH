namespace QLCHS.DTO
{
    public class EmailOTP
    {
            public string FromEmail { get; set; }
            public string ToEmail { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
    }

    public class VerifyOtpRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }

    public class UpdatePasswordRequest
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}
