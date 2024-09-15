using System.Text.Json.Serialization;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        
        [JsonIgnore]
        public string AppUserId { get; set; }
    }
}