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

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights([FromQuery] int departure, int arrival, DateTime date)
        {
            var flights = _context.Flights.AsQueryable();
            flights = flights.Where(flight => flight.DepartureAirportId.Equals(departure) && flight.ArrivalAirportId.Equals(arrival) && flight.DepartureDate.Date.Equals(date.Date));
            return await flights.OrderBy(flight => flight.FlightId).ToListAsync();
        }
/*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await _context.Flights.ToListAsync();
        }*/
    }
}
