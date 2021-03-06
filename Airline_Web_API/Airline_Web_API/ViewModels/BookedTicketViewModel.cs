﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class BookedTicketViewModel
    {
        public string DepartureCity { get; set; }
        public string DepartureCountry { get; set; }
        public string ArrivalCity { get; set; }
        public string ArrivalCountry { get; set; }
        public DateTime Date { get; set; }
        public string PassengerFirstName { get; set; }
        public string PassengerLastName { get; set; }
        public int CarryOnBagsNumber { get; set; }
        public int BaggageNumber { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
