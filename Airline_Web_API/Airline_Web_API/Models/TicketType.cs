﻿using System;
using System.Collections.Generic;

namespace Airline_Web_API.Models
{
    public class TicketType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CarryOnBagsNumber { get; set; }
        public int CarryOnBagMaxWeight { get; set; }
        public int BaggageNumber { get; set; }
        public int BaggageMaxWeight { get; set; }
        public decimal PricePerExtraCarryOnBag { get; set; }
        public decimal PricePerExtraCarryOnBagKg { get; set; }
        public decimal PricePerExtraBaggage { get; set; }
        public decimal PricePerExtraBaggageKg { get; set; }
        public bool SeatReservation { get; set; }
        public bool Changes { get; set; }
        public string Refund { get; set; }
        public string SeatType { get; set; }
        public string Status { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
