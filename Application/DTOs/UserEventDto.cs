using System.Text.Json.Serialization;

namespace Application.DTOs
{
    public class UserEventDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
        
        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}