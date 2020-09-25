using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class Ticket
    {
        public int TicketId { get; set;}
        public int FlightId { get; set; }
        public int TicketTypeId { get; set; }
        public decimal Price { get; set; }
        public int TotalNumber { get; set; }
        public int TicketsLeft { get; set; }

        public Flight Flight { get; set; }
        public TicketType TicketType { get; set; }
    }
}
