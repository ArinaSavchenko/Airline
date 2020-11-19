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
    [Authorize(Roles = "admin")]
    public class AirportsController : ControllerBase
    {
        private readonly AirportService _airportService;
        public AirportsController(AirportService airportService)
        {
            _airportService = airportService;
        }
        
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

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports([FromQuery] string value, string status)
        {
           var results = await _airportService.GetAirportsAsync(value, status);

            return Ok(results);
        }

        [HttpPost]
        public async Task<ActionResult> PostAirport([FromBody] AirportViewModel model)
        {
            await _airportService.AddAirportAsync(model);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAirport(int id, [FromBody] AirportViewModel model)
        {
            Response<string> updateResult = await _airportService.UpdateAirportAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAirport(int id)
        {
            Response<string> deleteResult = await _airportService.DeleteAirportAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}
