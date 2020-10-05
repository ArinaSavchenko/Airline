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
        public int? CarryOnBagsNumber { get; set; }
        public int? CarryOnBagMaxWeight { get; set; }
        public int? BaggageNumber { get; set; }
        public int? BaggageMaxWeight { get; set; }
        public bool SeatReservation { get; set; }
        public bool Changes { get; set; }
        public bool? Refund { get; set; }
    }
}
