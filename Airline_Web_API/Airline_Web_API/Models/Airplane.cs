using System.Collections.Generic;

namespace Airline_Web_API.Models
{
    public class Airplane
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SeatsNumber { get; set; }
        public double MaxWeight { get; set; }
        public string Status { get; set; }

        public ICollection<Seat> Seats { get; set; }
        public ICollection<Flight> Flights { get; set; }
    }
}
