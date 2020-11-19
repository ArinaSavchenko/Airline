using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class SeatViewModel
    {
        public int Id { get; set; }
        [Required]
        public int AirplaneId { get; set; }
        [Required]
        public string SectorName { get; set; }
        [Required]
        public int SectorNumber { get; set; }
        [Required]
        public string Column { get; set; }
        [Required]
        public int Number { get; set; }
        [Required]
        public string Type { get; set; }

        public AirplaneViewModel Airplane { get; set; }
    }
}
