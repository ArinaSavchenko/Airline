using System;

namespace Airline_Web_API.DTOs
{
    public class FlightForSearchModel
    {
        public int? DepartureAirportId { get; set; }
        public int? ArrivalAirportId { get; set; }
        public DateTime Date { get; set; }
        public int? TicketsNumber { get; set; }
        public string Status { get; set; }
    }
}
