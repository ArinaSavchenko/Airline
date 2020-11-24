using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using Airline_Web_API.Hubs;
using Airline_Web_API.DTOs;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Models;
using AutoMapper;

namespace Airline_Web_API.Services
{
    public class SelectedSeatService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<SeatsLockHub> _hubContext;
        private readonly ReservedSeatService _reservedSeatsService;

        public SelectedSeatService(AirlineContext context, IMapper mapper, IHubContext<SeatsLockHub> hubContext, ReservedSeatService reservedSeatService)
        {
            _context = context;
            _mapper = mapper;
            _hubContext = hubContext;
            _reservedSeatsService = reservedSeatService;
        }

        public async Task PostSelectedSeatAsync(SeatToBeSelected model)
        {
            var selectedSeat = _mapper.Map<SelectedSeat>(model);

            await _context.SelectedSeats.AddAsync(selectedSeat);
            await _context.SaveChangesAsync();

            await SendSelectedSeatsAsync(model.BookedTicketId);
        }

        public async Task DeleteSelectedSeatAsync(int bookedTicketId, int seatId)
        {
            var selectedSeat = await _context.SelectedSeats
                .Where(selectedSeat => selectedSeat.BookedTicketId == bookedTicketId && selectedSeat.SeatId == seatId)
                .FirstOrDefaultAsync();

            if (selectedSeat != null)
            {
                _context.Remove(selectedSeat);
                await _context.SaveChangesAsync();
            }
            await SendSelectedSeatsAsync(bookedTicketId);
        }

        public void CheckSelectedSeats()
        {
            var selectedSeatsWhichTimeExpired = _context.SelectedSeats.Where(selectedSeat => selectedSeat.SelectionExpirationTime < DateTime.Now).ToList();

            if (selectedSeatsWhichTimeExpired != null)
            {
                _context.RemoveRange(selectedSeatsWhichTimeExpired);
                _context.SaveChanges();
            }
        }

        public async Task SendSelectedSeatsAsync(int bookedTicketId)
        {
            var flightId = await _context.BookedTickets
                .Include(bookedTicket => bookedTicket.Ticket)
                .Where(bookedTicket => bookedTicket.Id == bookedTicketId)
                .Select(bookedTicket => bookedTicket.Ticket.FlightId)
                .FirstOrDefaultAsync();

            var reservedSeats = await _reservedSeatsService.GetReservedSeatsByBookedTicketIdAsync(bookedTicketId);

            var selectedSeats = await _context.SelectedSeats
                .Include(seat => seat.BookedTicket.Ticket)
                .Where(seat => seat.BookedTicket.Ticket.FlightId == flightId)
                .Select(seat => new ReservedSeatViewModel
                {
                    BookedTicketId = seat.BookedTicketId,
                    SeatId = seat.SeatId
                })
                .ToListAsync();

            selectedSeats.AddRange(reservedSeats);

            await _hubContext.Clients.Group(flightId.ToString()).SendAsync("ReceiveLockedSeats", selectedSeats);
        }
    }
}
