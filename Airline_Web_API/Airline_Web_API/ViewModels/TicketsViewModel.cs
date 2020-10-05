using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class TicketsViewModel
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public int flightId { get; set; }
        public TicketTypeViewModel TicketType { get; set; }
    }
}
