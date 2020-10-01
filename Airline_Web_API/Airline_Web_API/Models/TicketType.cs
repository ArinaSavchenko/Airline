using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class TicketType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CarryOnBagNumber { get; set; }
        public int? CarryOnBagMaxWeight { get; set; }
        public int? BaggageNumber { get; set; }
        public int? BaggageMaxWeight { get; set; }
        public bool SeatReservation { get; set; }
        public bool Changes { get; set; }
        public string Refund { get; set; }
        public string SeatType { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
