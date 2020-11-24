using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class FlightViewModel
    {
        public int Id { get; set; }
        [Required]
        public DateTime DepartureDate { get; set; }
        [Required]
        public DateTime ArrivalDate { get; set; }
        [Required]
        public string Status { get; set; }

        [Required]
        public AirportViewModel DepartureAirport { get; set; }
        [Required]
        public AirportViewModel ArrivalAirport { get; set; }
        [Required]
        public AirplaneViewModel Airplane { get; set; }

        public ICollection<TicketViewModel> Tickets { get; set; }
    }
}
