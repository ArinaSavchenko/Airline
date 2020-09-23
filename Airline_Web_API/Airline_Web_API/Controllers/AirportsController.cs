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
    [Route("api/airports")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly AirlineContext _context;

        public AirportsController(AirlineContext context)
        {
            _context = context;
        }

        // GET: api/airports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports([FromQuery] string value)
        {
            var airports = _context.Airports.AsQueryable();

            if (!string.IsNullOrEmpty(value))
            {
                airports = airports.Where(airport => airport.Name.Contains(value));
            }
            return await airports.OrderBy(airport => airport.City).ToListAsync();
        }

    }
}
