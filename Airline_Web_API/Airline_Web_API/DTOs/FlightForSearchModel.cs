using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace Airline_Web_API.DTOs
{
    public class FlightForSearchModel
    {
        public int? departureAirportId { get; set; }
        public int? arrivalAirportId { get; set; }
        public DateTime date { get; set; }
        public int? ticketsNumber { get; set; }
        public string Status { get; set; }
    }
}
