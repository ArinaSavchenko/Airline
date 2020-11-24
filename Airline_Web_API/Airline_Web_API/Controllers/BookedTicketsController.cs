﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Airline_Web_API.DTOs;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Route("api/booked-tickets")]
    [ApiController]
    public class BookedTicketsController : ControllerBase
    {
        private readonly BookedTicketService _bookedTicketService;

        public BookedTicketsController(BookedTicketService bookedTicketService)
        {
            _bookedTicketService = bookedTicketService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookedTicketViewModel>> GetBookedTicket(int id)
        {
            var bookedTicket = await _bookedTicketService.GetBookedTicketByIdAsync(id);

            if (bookedTicket == null)
            {
                return NotFound();
            }

            return Ok(bookedTicket);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookedTicketHistoryModel>>> GetBookedTicketsByUserId([FromQuery] int userId)
        {
            var bookedTickets = await _bookedTicketService.GetBookedTicketsByUserIdAsync(userId);

            return Ok(bookedTickets);
        }

        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<TicketWasBookedResponseModel>>> Post([FromBody]IEnumerable<NewBookedTicketModel> models)
        {
            var response = await _bookedTicketService.AddBookedTicketAsync(models);

            if (response == null)
            {
                return BadRequest();
            }

            return Ok(response);
        }
    }
}
