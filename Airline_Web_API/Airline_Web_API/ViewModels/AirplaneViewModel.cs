using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class AirplaneViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SeatsNumber { get; set; }
        public double MaxWeight { get; set; }
        public string Status { get; set; }
    }
}
