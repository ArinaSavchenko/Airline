﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Airline_Web_API.Helpers;
using Airline_Web_API.Models;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Route("api/reserved-seats")]
    [ApiController]
    public class ReservedSeatsController : ControllerBase
    {
        private readonly ReservedSeatService _reservedSeatService;
        private readonly SelectedSeatService _selectedSeatService;

        public ReservedSeatsController(ReservedSeatService reservedSeatService, SelectedSeatService selectedSeatService)
        {
            _reservedSeatService = reservedSeatService;
            _selectedSeatService = selectedSeatService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservedSeatViewModel>>> GetReservedSeatsByBookedTicketId([FromQuery] int bookedTicketId)
        {
            var reservedSeats = await _reservedSeatService.GetReservedSeatsByBookedTicketIdAsync(bookedTicketId);

            if (reservedSeats == null)
            {
                return NoContent();
            }

            return Ok(reservedSeats);
        }

        [HttpPost]
        public async Task<ActionResult<Response<string>>> PostReservedSeat(ReservedSeat reservedSeat)
        {
            var response = await _reservedSeatService.ReserveSeatAsync(reservedSeat);

            if (response == null)
            {
                return BadRequest();
            }

            await _selectedSeatService.DeleteSelectedSeatAsync(reservedSeat.BookedTicketId, reservedSeat.SeatId);

            return Ok(response);
        }
    }
}
