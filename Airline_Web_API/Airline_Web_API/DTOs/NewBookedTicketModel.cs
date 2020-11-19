using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class NewBookedTicketModel
    {
        [Required]
        public int TicketId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Invalid format for passport")]
        public string Passport { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for first name")]
        public string PassengerFirstName { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for last name")]
        public string PassengerLastName { get; set; }
        [Required]
        [Range(0, 100)]
        public int CarryOnBagsNumber { get; set; }
        [Required]
        [Range(0, 100)]
        public int BaggageNumber { get; set; }
        [Required]
        [Range(0, (double)decimal.MaxValue)]
        public decimal TotalPrice { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
