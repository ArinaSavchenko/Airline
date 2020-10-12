using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using Airline_Web_API.Models;

namespace Airline_Web_API.Controllers
{
    [Route("api/airports")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly AirportService _airportService;
        public AirportsController(AirportService airportService)
        {
            _airportService = airportService;
        }

        // GET: api/airports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports([FromQuery] string value)
        {
            var results = await _airportService.GetAirports(value);

            return Ok (results);
        }
    }
}
