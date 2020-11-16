using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class TicketViewModel
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public decimal Price { get; set; }
        public int TicketsLeftNumber { get; set; }
        public string Status { get; set; }

        public FlightViewModel Flight { get; set; }
        public TicketTypeViewModel TicketType { get; set; }
    }
}
