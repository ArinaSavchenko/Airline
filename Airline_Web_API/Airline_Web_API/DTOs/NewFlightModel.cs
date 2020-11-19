using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class NewFlightModel
    {
        [Required]
        public int DepartureAirportId { get; set; }
        [Required]
        public int ArrivalAirportId { get; set; }
        [Required]
        public int AirplaneId { get; set; }
        [Required]
        public DateTime DepartureDate { get; set; }
        [Required]
        public DateTime ArrivalDate { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
