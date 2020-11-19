using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class TicketTypeViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [Range(0, 100)]
        public int CarryOnBagsNumber { get; set; }
        [Required]
        [Range(0, 1000)]
        public int CarryOnBagMaxWeight { get; set; }
        [Required]
        [Range(0, 100)]
        public int BaggageNumber { get; set; }
        [Required]
        [Range(0, 1000)]
        public int BaggageMaxWeight { get; set; }
        [Required]
        [Range(0, (double)decimal.MaxValue)]
        public decimal PricePerExtraCarryOnBag { get; set; }
        [Required]
        [Range(0, (double)decimal.MaxValue)]
        public decimal PricePerExtraCarryOnBagKg { get; set; }
        [Required]
        [Range(0, (double)decimal.MaxValue)]
        public decimal PricePerExtraBaggage { get; set; }
        [Required]
        [Range(0, (double)decimal.MaxValue)]
        public decimal PricePerExtraBaggageKg { get; set; }
        [Required]
        public bool SeatReservation { get; set; }
        [Required]
        public bool Changes { get; set; }
        [Required]
        public string Refund { get; set; }
        [Required]
        public string SeatType { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
