using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class NewTicketModel
    {
        [Required(ErrorMessage = "Flight is required")]
        public int FlightId { get; set; }
        [Required(ErrorMessage = "Type of ticket is required")]
        public int TicketTypeId { get; set; }
        [Required(ErrorMessage = "Number of tickets is required")]
        public int TicketsLeftNumber { get; set; }
        [Required(ErrorMessage = "Price is required")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }
    }
}
