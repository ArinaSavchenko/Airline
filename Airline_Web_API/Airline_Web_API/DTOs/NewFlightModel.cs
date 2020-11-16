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
        [Required(ErrorMessage = "Airplane is required")]
        public int AirplaneId { get; set; }
        [Required(ErrorMessage = "Departure date is required")]
        public DateTime DepartureDate { get; set; }
        [Required(ErrorMessage = "Arrival date is required")]
        public DateTime ArrivalDate { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
