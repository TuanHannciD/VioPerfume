namespace MyAppAPI.Services
{
    public class ServiceResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public ServiceResponse(bool success, string message) {  Success = success; Message = message; }
    }
}
