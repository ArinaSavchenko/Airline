using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Airline_Web_API.Helpers;
using Airline_Web_API.DTOs;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;

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
            var ticket = await _context.Tickets
                .Include(ticket => ticket.TicketType)
                .FirstOrDefaultAsync(ticket => ticket.Id == id);

            var result = _mapper.Map<TicketsViewModel>(ticket);

            return result;
        }

        public async Task<IEnumerable<TicketsViewModel>> GetTicketsAsync(int flightId)
        {
            var tickets = await _context.Tickets
                .Include(ticket => ticket.TicketType)
                .AsQueryable()
                .Where(ticket => ticket.FlightId == flightId)
                .OrderBy(ticket => ticket.Id)
                .ToListAsync();

            var result = _mapper.Map<IEnumerable<TicketsViewModel>>(tickets);

            return result;
        }

        public async Task AddTicketAsync(NewTicketModel model)
        {
            var ticket = _mapper.Map<Ticket>(model);

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task<Response<string>> UpdateTicketAsync(int id, TicketsViewModel model)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such ticket"
                };
            }

            _mapper.Map(model, ticket);
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Ticket was succesfully updated"
            };
        }

        public async Task<Response<string>> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such ticket"
                };
            }

            ticket.Status = "Deleted";
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Ticket was succesfully deleted"
            };
        }
    }
}
