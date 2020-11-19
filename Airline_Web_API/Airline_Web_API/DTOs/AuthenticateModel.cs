using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class AuthenticateModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Email is not valid")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

