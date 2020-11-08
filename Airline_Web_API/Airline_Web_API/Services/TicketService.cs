using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Airline_Web_API.Services
{
    public class TicketService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public TicketService(AirlineContext airlineContext, IMapper mapper)
        {
            _context = airlineContext;
            _mapper = mapper;
        }

        public async Task<TicketsViewModel> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            var result = _mapper.Map<TicketsViewModel>(ticket);

            return result;
        }

        public async Task<List<TicketsViewModel>> GetTicketsAsync(int flightId)
        {
            var tickets = await _context.Tickets
                .Include(ticket => ticket.TicketType)
                .AsQueryable()
                .Where(ticket => ticket.FlightId == flightId)
                .OrderBy(ticket => ticket.Id)
                .ToListAsync();

            var result = _mapper.Map<List<TicketsViewModel>>(tickets);

            return result;
        }
    }
}
