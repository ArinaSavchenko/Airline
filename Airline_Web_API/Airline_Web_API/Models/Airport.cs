using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class Airport
    {
        public int AirportId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public ICollection<Flight> FlightsFrom { get; set; }
        public ICollection<Flight> FlightsTo { get; set; }
    }
}
