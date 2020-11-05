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

        public async Task<IEnumerable<SeatViewModel>> GetSeatsAsync(int airplaneId)
        {
            var seats = _context.Seats.AsQueryable();

            seats = seats.Where(seat => seat.AirplaneId == airplaneId);

            var seatsSearchResults = await seats
                .OrderBy(seat => seat.Id)
                .ToListAsync();

            var results = _mapper.Map<List<SeatViewModel>>(seatsSearchResults);

            return results;
        }

        public async Task AddSeatsAsync(SeatViewModel[] seatsModel)
        {
            var seats = _mapper.Map<List<Seat>>(seatsModel);
            _context.Seats.AddRange(seats);
            await _context.SaveChangesAsync();
        }
    }
}
