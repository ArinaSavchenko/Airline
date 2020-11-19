using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Helpers;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/airplanes")]
    [ApiController]
    public class AirplanesController : ControllerBase
    {
        private readonly AirplaneService _airplaneService;
        public AirplanesController(AirplaneService airplaneService)
        {
            _airplaneService = airplaneService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AirplaneViewModel>> GetAirplaneById(int id)
        {
            var results = await _airplaneService.GetAirplaneByIdAsync(id);

            if (results == null)
            {
                return NotFound();
            }

            return Ok(results);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AirplaneViewModel>>> GetAirplanes([FromQuery] string name)
        {
            var results = await _airplaneService.GetAirplanesAsync(name);

            return Ok(results);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<int>> PostAirplane([FromBody] AirplaneViewModel model)
        {
            int newAirportId =  await _airplaneService.AddAirplaneAsync(model);

            return Ok(newAirportId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<string>>> UpdateAirport(int id, [FromBody] AirplaneViewModel model)
        {
            Response<string> updateResult = await _airplaneService.UpdateAirplaneAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<string>>> DeleteAirplane(int id)
        {
            Response<string> deleteResult = await _airplaneService.DeleteAirplaneAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}
