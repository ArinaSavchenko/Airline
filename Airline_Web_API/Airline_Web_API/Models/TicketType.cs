using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class TicketType
    {
        public int Id { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
