﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using Microsoft.AspNetCore.Authorization;
using Airline_Web_API.Helpers;
using Airline_Web_API.DTOs;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights([FromQuery] FlightForSearchModel model)
        {
            var results = await _flightService.GetFlightsAsync(model);

            return Ok(results);
        }

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

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult> PostFlight([FromBody] NewFlightModel model)
        {
            var flightId = await _flightService.AddFlightAsync(model);

            return Ok(flightId);
        }

        [Authorize(Roles = "admin")]
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

        [Authorize(Roles = "admin")]
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
