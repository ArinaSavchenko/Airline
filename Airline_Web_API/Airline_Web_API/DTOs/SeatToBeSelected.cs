using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class SeatToBeSelected
    {
        [Required]
        public int BookedTicketId { get; set; }
        [Required]
        public int SeatId { get; set; }
        [Required]
        public DateTime SelectionTime { get; set; }
    }
}
