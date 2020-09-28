using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    [Table("Flights")]
    public class Flight
    {
        public int Id { get; set; }
        public int DepartureAirportId { get; set; }
        public int ArrivalAirportId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }

        public virtual Airport DepartureAirport { get; set; }
        public virtual Airport ArrivalAirport { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
