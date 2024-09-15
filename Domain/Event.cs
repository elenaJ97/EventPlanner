namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; } 
        public string Description { get; set; }
        public string Location { get; set; }
        public string Image { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<EventAttendee> Attendees { get; set; } = new List<EventAttendee>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}