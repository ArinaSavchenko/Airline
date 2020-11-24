using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class ReservedSeatViewModel
    {
        public int Id { get; set; }
        [Required]
        public int BookedTicketId { get; set; }
        [Required]
        public int SeatId { get; set; }
    }
}
