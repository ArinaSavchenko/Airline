using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.DTOs
{
    public class NewFlightModel
    {
        public int DepartureAirportId { get; set; }
        public int ArrivalAirportId { get; set; }
        public int AirplaneId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public string Status { get; set; }
    }
}
