using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Airline_Web_API.Services;
using Airline_Web_API.DTOs;
using Airline_Web_API.Models;

namespace Airline_Web_API.Controllers
{
    [Route("api/selected-seats")]
    [ApiController]
    public class SelectedSeatsController : ControllerBase
    {
        private readonly SelectedSeatService _selectedSeatService;

        public SelectedSeatsController(SelectedSeatService selectedSeatService)
        {
            _selectedSeatService = selectedSeatService;
        }

        [HttpPost]
        public async Task<ActionResult> PostSelectedSeat([FromBody] SeatToBeSelected seat)
        {
            await _selectedSeatService.PostSelectedSeatAsync(seat);

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSelectedSeat([FromQuery] int bookedTicketId, int seatId)
        {
            await _selectedSeatService.DeleteSelectedSeatAsync(bookedTicketId, seatId);

            return Ok();
        }
    }
}
