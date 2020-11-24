using System.Collections.Generic;

namespace Airline_Web_API.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int AirplaneId { get; set; }
        public string SectorName { get; set; }
        public int SectorNumber { get; set; }
        public string Column { get; set; }
        public int Number { get; set; }
        public string Type { get; set; }

        public Airplane Airplane { get; set; }

        public ICollection<ReservedSeat> ReservedSeats { get; set; }
        public ICollection<SelectedSeat> SelectedSeats { get; set; }

    }
}
