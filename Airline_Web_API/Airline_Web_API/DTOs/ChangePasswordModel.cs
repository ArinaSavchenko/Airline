﻿using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.DTOs
{
    public class ChangePasswordModel
    {
        public int UserId { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
