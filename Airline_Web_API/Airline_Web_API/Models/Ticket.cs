using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class Ticket
    {
        public int Id { get; set;}
        public int FlightId { get; set; }
        public int TicketTypeId { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }

        public Flight Flight { get; set; }
        public User User { get; set; }
        public TicketType TicketType { get; set; }
    }
}
