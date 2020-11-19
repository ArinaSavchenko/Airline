﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Models
{
    public class Airport
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Status { get; set; }

        public ICollection<Flight> FlightsFrom { get; set; }
        public ICollection<Flight> FlightsTo { get; set; }
    }
}
