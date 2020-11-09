using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.ViewModels
{
    public class SeatViewModel
    {
        public int Id { get; set; }
        public int AirplaneId { get; set; }
        public string SectorName { get; set; }
        public int SectorNumber { get; set; }
        public string Column { get; set; }
        public int Number { get; set; }
        public string Type { get; set; }

        public AirplaneViewModel Airplane { get; set; }
    }
}
