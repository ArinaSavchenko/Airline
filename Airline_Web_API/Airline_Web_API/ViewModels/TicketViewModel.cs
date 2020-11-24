﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class TicketViewModel
    {
        public int Id { get; set; }
        [Required]
        public int FlightId { get; set; }
        [Required]
        [Range(0,(double)decimal.MaxValue)]
        public decimal Price { get; set; }
        [Required]
        [Range(0, Int32.MaxValue)]
        public int TicketsLeftNumber { get; set; }
        [Required]
        public string Status { get; set; }

        public TicketTypeViewModel TicketType { get; set; }
    }
}
