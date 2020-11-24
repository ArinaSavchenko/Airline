using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class AirplaneViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Range(0, Int32.MaxValue)]
        public int SeatsNumber { get; set; }
        [Required]
        [Range(400, Double.MaxValue)]
        public double MaxWeight { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
