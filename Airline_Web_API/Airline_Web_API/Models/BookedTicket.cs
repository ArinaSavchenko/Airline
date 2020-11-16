using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class BookedTicket
    {
        public int Id { get; set; }
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public string Passport { get; set; }
        public string PassengerFirstName { get; set; }
        public string PassengerLastName { get; set; }
        public int CarryOnBagsNumber { get; set; }
        public int BaggageNumber { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }

        public User User { get; set; }
        public Ticket Ticket { get; set; }
    }
}
