using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;

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
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights([FromQuery] int departureAirportId, int arrivalAirportId, DateTime date, int ticketsNumber)
        {
            var flights = _context.Flights
                .Include(flight => flight.DepartureAirport)
                .Include(flight => flight.ArrivalAirport)
                .Include(flight => flight.Tickets)
                .AsQueryable();
            flights = flights.Where(flight =>
                flight.DepartureAirportId == departureAirportId
                && flight.ArrivalAirportId == arrivalAirportId
                && flight.DepartureDate.Date == date.Date
                && flight.Tickets
                    .Count(ticket => ticket.TicketsLeftNumber >= ticketsNumber) > 0
            );
                
            return await flights
                .OrderBy(flight => flight.Id)
                .ToListAsync();
        }
    }
}
