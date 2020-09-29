using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class TicketTypeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Carry_on_bag { get; set; }
        public string Baggage { get; set; }
        public string Seat_reservation { get; set; }
        public string Changes { get; set; }
        public string Refund { get; set; }
    }
}
