using System;

namespace Airline_Web_API.Models
{
    public class SelectedSeat
    {
        public int Id { get; set; }
        public int BookedTicketId { get; set; }
        public int SeatId { get; set; }
        public DateTime SelectionExpirationTime { get; set; }

        public BookedTicket BookedTicket { get; set; }
        public Seat Seat { get; set; }
    }
}
