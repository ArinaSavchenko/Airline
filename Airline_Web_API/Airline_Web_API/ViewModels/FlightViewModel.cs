﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class FlightViewModel
    {
        public int Id { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public string Status { get; set; }

        public AirportAdminViewModel DepartureAirport { get; set; }
        public AirportAdminViewModel ArrivalAirport { get; set; }
        public AirplaneViewModel Airplane { get; set; }

        public ICollection<TicketsViewModel> Tickets { get; set; }
    }
}
