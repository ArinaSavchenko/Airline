using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using AutoMapper;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using System.Data;

namespace Airline_Web_API.Controllers
{
    [Route("api/flights")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly FlightService _flightService;
        public FlightsController(FlightService flightService)
        {
            _flightService = flightService;
        }

        // GET: api/flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights([FromQuery] int departureAirportId, int arrivalAirportId, DateTime date, int ticketsNumber)
        {
            var results = await _flightService.GetFlights(departureAirportId, arrivalAirportId, date, ticketsNumber);

            return Ok(results);
        }

        //GET: api/flights/id
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightViewModel>> GetFlight(int id)
        {
            var result = await _flightService.GetFlight(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
