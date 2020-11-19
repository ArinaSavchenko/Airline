using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class AirplaneViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int SeatsNumber { get; set; }
        [Required]
        [Range(400, Double.MaxValue)]
        public double MaxWeight { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
