using System;

namespace Airline_Web_API.DTOs
{
    public class BookedTicketHistoryModel
    {
        public int BookedTicketId { get; set; }
        public string DepartureCity { get; set; }
        public string DepartureCountry { get; set; }
        public string ArrivalCity { get; set; }
        public string ArrivalCountry { get; set; }
        public DateTime Date { get; set; }
    }
}
