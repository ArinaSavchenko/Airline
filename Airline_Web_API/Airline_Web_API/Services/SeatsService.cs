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
    public class SeatsService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public SeatsService(AirlineContext airlineContext, IMapper mapper)
        {
            _context = airlineContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SeatViewModel>> GetSeatsByBookedTicketIdAsync(int bookedTicketId)
        {
            var airplaneId = await _context.BookedTickets
                .Include("Ticket.Flight")
                .Where(bookedTicket => bookedTicket.Id == bookedTicketId)
                .Select(bookedTicket => bookedTicket.Ticket.Flight.AirplaneId)
                .FirstOrDefaultAsync();

            var seats = await GetSeatsAsync(airplaneId);

            return seats;
        }

        public async Task<IEnumerable<SeatViewModel>> GetSeatsAsync(int airplaneId)
        {
            var seats = _context.Seats.AsQueryable();

            seats = seats.Where(seat => seat.AirplaneId == airplaneId);

            var seatsSearchResults = await seats
                .OrderBy(seat => seat.SectorName)
                .ThenBy(seat => seat.SectorNumber)
                .ThenBy(seat => seat.Column)
                .ThenBy(seat => seat.Number)
                .ToListAsync();

            var results = _mapper.Map<IEnumerable<SeatViewModel>>(seatsSearchResults);

            return results;
        }

        public async Task<bool> AddSeatsAsync(SeatViewModel[] models)
        {
            var valuesChecked = CheckExistance(models);

            if (!valuesChecked)
            {
                return false;
            }

            var seats = _mapper.Map<List<Seat>>(models);
            _context.Seats.AddRange(seats);
            await _context.SaveChangesAsync();

            return true;
        }

        public bool CheckExistance(SeatViewModel[] models)
        {
            var airplaneIds = models.Select(model => model.AirplaneId).GroupBy(airplaneId => airplaneId).Select(g => g.First());
            var airplanes = _context.Airplanes.Where(airplane => airplaneIds.Contains(airplane.Id)).Count();

            if (airplanes != airplaneIds.Count())
            {
                return false;
            }

            return true;
        }
    }
}
