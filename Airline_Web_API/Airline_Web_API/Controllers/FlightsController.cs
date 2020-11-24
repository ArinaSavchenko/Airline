using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using Airline_Web_API.Helpers;
using Airline_Web_API.DTOs;

namespace Airline_Web_API.Controllers
{
    [Route("api/flights")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class FlightsController : ControllerBase
    {
        private readonly FlightService _flightService;

        public FlightsController(FlightService flightService)
        {
            _flightService = flightService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightViewModel>>> GetFlights([FromQuery] FlightForSearchModel model)
        {
            var results = await _flightService.GetFlightsAsync(model);

            return Ok(results);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightViewModel>> GetFlight(int id)
        {
            var result = await _flightService.GetFlightByIdAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> PostFlight([FromBody] NewFlightModel model)
        {
            var flightId = await _flightService.AddFlightAsync(model);

            if (flightId == null)
            {
                return BadRequest();
            }

            return Ok(flightId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<string>>> UpdateFlight(int id, [FromBody] FlightViewModel model)
        {
            Response<string> updateResult = await _flightService.UpdateFlightAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<string>>> DeleteFlight(int id)
        {
            Response<string> deleteResult = await _flightService.DeleteFlightAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}
