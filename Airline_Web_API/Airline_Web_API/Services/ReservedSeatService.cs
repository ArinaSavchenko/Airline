using Airline_Web_API.Helpers;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Services
{
    public class ReservedSeatService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public ReservedSeatService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReservedSeatViewModel>> GetReservedSeatsByBookedTicketIdAsync(int bookedTicketId)
        {
            var bookedTicket = await _context.BookedTickets
                .Include(bookedTicket => bookedTicket.Ticket)
                .FirstOrDefaultAsync(bookedTicket => bookedTicket.Id == bookedTicketId);

            var reservedSeats = await _context.ReservedSeats
                .Where(reservdSeat => reservdSeat.BookedTicket.Ticket.FlightId == bookedTicket.Ticket.FlightId)
                .ToListAsync();

            var result = _mapper.Map<IEnumerable<ReservedSeatViewModel>>(reservedSeats);

            return result;
        }

        public async Task<Response<string>> ReserveSeatAsync(ReservedSeat reservedSeat)
        {
            _context.ReservedSeats.Add(reservedSeat);
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Seat was successfully reserved"
            };
        }
    }
}
