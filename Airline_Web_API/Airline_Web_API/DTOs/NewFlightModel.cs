using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class NewFlightModel
    {
        [Required(ErrorMessage = "Departure airport is required")]
        public int DepartureAirportId { get; set; }
        [Required(ErrorMessage = "Arrival airport is required")]
        public int ArrivalAirportId { get; set; }
        [Required(ErrorMessage = "Arrival is required")]
        public int AirplaneId { get; set; }
        [Required]
        public DateTime DepartureDate { get; set; }
        [Required]
        public DateTime ArrivalDate { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
