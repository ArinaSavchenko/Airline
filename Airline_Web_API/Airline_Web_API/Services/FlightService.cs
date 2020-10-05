using Airline_Web_API.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Airline_Web_API.Services
{
    public class FlightService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public FlightService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FlightViewModel>> GetFlights(int departureAirportId, int arrivalAirportId, DateTime date, int ticketsNumber)
        {
            var flights = _context.Flights
                .Include(flight => flight.DepartureAirport)
                .Include(flight => flight.ArrivalAirport)
                .Include(flight => flight.Tickets)
                    .ThenInclude(ticket => ticket.TicketType)
                .AsQueryable();

            flights = flights.Where(flight =>
                flight.DepartureAirportId == departureAirportId
                && flight.ArrivalAirportId == arrivalAirportId
                && flight.DepartureDate.Date == date.Date
                && flight.Tickets
                    .Count(ticket => ticket.TicketsLeftNumber >= ticketsNumber) >= 0
            );

            var flightsSearchResults = await flights
                .OrderBy(flight => flight.Id)
                .ToListAsync();

            var results = _mapper.Map<List<FlightViewModel>>(flightsSearchResults);

            return results;
        }

        public async Task<FlightViewModel> GetFlight(int id)
        {
            var flight = await _context.Flights
                .Include(flight => flight.DepartureAirport)
                .Include(flight => flight.ArrivalAirport)
                .Where(flight => flight.Id == id)
                .FirstOrDefaultAsync();

            if (flight == null)
            {
                return null;
            }

            var result = _mapper.Map<FlightViewModel>(flight);

            return result;
        }
    }
}
