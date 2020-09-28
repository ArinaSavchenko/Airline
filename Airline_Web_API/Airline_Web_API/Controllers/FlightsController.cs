using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using Microsoft.VisualBasic.CompilerServices;

namespace Airline_Web_API.Controllers
{
    [Route("api/flights")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly AirlineContext _context;

        public FlightsController(AirlineContext context)
        {
            _context = context;
        }

        // GET: api/flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightViewModel>>> GetFlights([FromQuery] int departureAirportId, int arrivalAirportId, DateTime date, int ticketsNumber)
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
                    .Count(ticket => ticket.TicketsLeftNumber >= ticketsNumber) > 0
            );

            var flightsSearchResults = await flights
                .OrderBy(flight => flight.Id)
                .ToListAsync();

            var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Airport, AirportViewModel>();
                    cfg.CreateMap<TicketType, TicketTypeViewModel>();
                    cfg.CreateMap<Ticket, TicketsViewModel>();
                    cfg.CreateMap<Flight, FlightViewModel>();
                });

            var mapper = new Mapper(config);
            var result = mapper.Map<List<FlightViewModel>>(flightsSearchResults);

            return Ok (result);
        }
    }
}
