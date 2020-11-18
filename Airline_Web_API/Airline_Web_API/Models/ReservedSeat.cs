using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class ReservedSeat
    {
        public int Id { get; set; }
        public int BookedTicketId { get; set; }
        public int SeatId { get; set; }

        public BookedTicket BookedTicket { get; set; }
        public Seat Seat { get; set; }
    }
}
