using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class AirportViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for city")]
        public string City { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for country")]
        public string Country { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
