using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class AirportUserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
