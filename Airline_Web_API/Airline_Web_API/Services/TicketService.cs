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

        public async Task<TicketViewModel> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets
                .Include(ticket => ticket.TicketType)
                .FirstOrDefaultAsync(ticket => ticket.Id == id);

            var result = _mapper.Map<TicketViewModel>(ticket);

            return result;
        }

        public async Task<IEnumerable<TicketViewModel>> GetTicketsAsync(int flightId)
        {
            var tickets = await _context.Tickets
                .Include(ticket => ticket.TicketType)
                .AsQueryable()
                .Where(ticket => ticket.FlightId == flightId)
                .OrderBy(ticket => ticket.Id)
                .ToListAsync();

            var result = _mapper.Map<IEnumerable<TicketViewModel>>(tickets);

            return result;
        }

        public async Task<bool> AddTicketAsync(NewTicketModel model)
        {
            bool valuesChecked = await CheckExistanceAsync(model.FlightId);

            if (!valuesChecked)
            {
                return false;
            }

            var ticket = _mapper.Map<Ticket>(model);
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Response<string>> UpdateTicketAsync(int id, TicketViewModel model)
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

            bool valuesChecked = await CheckExistanceAsync(model.FlightId);

            if (!valuesChecked)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "Values are invalid"
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

        public async Task<bool> CheckExistanceAsync(int flightId)
        {
            var departureAirport = await _context.Flights.FindAsync(flightId);

            if (departureAirport == null)
            {
                return false;
            }

            return true;
        }
    }
}
