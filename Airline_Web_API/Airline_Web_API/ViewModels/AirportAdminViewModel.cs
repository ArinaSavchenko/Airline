using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class AirportAdminViewModel
    {
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }
        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
