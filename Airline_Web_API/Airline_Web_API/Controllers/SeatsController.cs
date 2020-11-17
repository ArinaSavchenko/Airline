using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Models;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Route("api/seats-scheme")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private readonly SeatsService _seatsService;
        public SeatsController(SeatsService seatsService)
        {
            _seatsService = seatsService;
        }

        [HttpGet("booked-tickets")]
        public async Task<ActionResult<IEnumerable<SeatViewModel>>> GetSeatsByBookedTicketID([FromQuery] int bookedTicketId)
        {
            var seats = await _seatsService.GetSeatsAsync(bookedTicketId);

            if (seats == null)
            {
                return NoContent();
            }

            return Ok(seats);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeatViewModel>>> GetSeats([FromQuery] int airplaneId)
        {
            var seats = await _seatsService.GetSeatsAsync(airplaneId);

            if (seats == null)
            {
                return NoContent();
            }

            return Ok(seats);
        }

        [Authorize(Roles="admin")]
        [HttpPost]
        public async Task<ActionResult> PostSeats([FromBody] SeatViewModel[] seats)
        {
            await _seatsService.AddSeatsAsync(seats);

            return Ok();
        }
    }
}
