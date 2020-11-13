using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.DTOs
{
    public class TicketWasBookedResponseModel
    {
        public int Id { get; set; }
        public string PassengerFirstName { get; set; }
        public string PassengerLastName { get; set; }
    }
}
