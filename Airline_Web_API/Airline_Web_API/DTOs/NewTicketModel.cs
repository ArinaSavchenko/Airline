using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.DTOs
{
    public class NewTicketModel
    {
        [Required]
        public int FlightId { get; set; }
        [Required]
        public int TicketTypeId { get; set; }
        [Required]
        public int TicketsLeftNumber { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
