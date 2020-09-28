using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class FlightViewModel
    {
        public int Id { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }

        public virtual AirportViewModel DepartureAirport { get; set; }
        public virtual AirportViewModel ArrivalAirport { get; set; }

        public virtual ICollection<TicketsViewModel> Tickets { get; set; }
    }
}
