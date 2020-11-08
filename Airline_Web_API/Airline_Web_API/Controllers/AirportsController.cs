using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using Airline_Web_API.Models;
using Airline_Web_API.Helpers;

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
        
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Airport>> GetAirportById(int id)
        {
            var results = await _airportService.GetAirportByIdAsync(id);

            if (results == null)
            {
                return NotFound();
            }

            return Ok(results);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports([FromQuery] string value)
        {
            var results = await _airportService.GetAirportsAsync(value);

            return Ok(results);
        }

        [Authorize(Roles ="admin")]
        [HttpPost]
        public async Task<ActionResult> PostAirport([FromBody] Airport airport)
        {
            await _airportService.AddAirportAsync(airport);

            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateAirport([FromBody] AirportViewModel model)
        {
            Response<string> updateResult = await _airportService.UpdateAirportAsync(model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAirport(int id)
        {
            Response<string> updateResult = await _airportService.DeleteAirportAsync(id);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }
    }
}
