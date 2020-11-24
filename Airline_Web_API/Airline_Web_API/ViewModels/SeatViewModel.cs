using System;
using System.ComponentModel.DataAnnotations;

namespace Airline_Web_API.ViewModels
{
    public class SeatViewModel
    {
        public int Id { get; set; }
        [Required]
        public int AirplaneId { get; set; }
        [Required]
        [RegularExpression(@"^[A-Z]+$", ErrorMessage = "Invalid format for sector name")]
        public string SectorName { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int SectorNumber { get; set; }
        [Required]
        [RegularExpression(@"^[A-Z]+$", ErrorMessage = "Invalid format for column name")]
        public string Column { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Number { get; set; }
        [Required]
        public string Type { get; set; }

        public AirplaneViewModel Airplane { get; set; }
    }
}
