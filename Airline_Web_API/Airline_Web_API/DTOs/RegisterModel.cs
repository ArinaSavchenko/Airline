using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class RegisterModel
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for first name")]
        public string FirstName { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Invalid format for last name")]
        public string LastName { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid format for email")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
