using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.DTOs
{
    public class SeatToBeSelected
    {
        public int BookedTicketId { get; set; }
        public int SeatId { get; set; }
        public DateTime SelectionTime { get; set; }
    }
}
