using System;

namespace Airline_Web_API.DTOs
{
    public class NewBookedTicketModel
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public string Passport { get; set; }
        public string PassengerFirstName { get; set; }
        public string PassengerLastName { get; set; }
        public int CarryOnBagsNumber { get; set; }
        public int BaggageNumber { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
