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

        public AirportViewModel DepartureAirport { get; set; }
        public AirportViewModel ArrivalAirport { get; set; }

        public ICollection<TicketsViewModel> Tickets { get; set; }
    }
}
