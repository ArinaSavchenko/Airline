using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using System.Threading.Tasks;
using Airline_Web_API.Services;
using Microsoft.AspNetCore.Authorization;
using Airline_Web_API.Helpers;
using Airline_Web_API.DTOs;

namespace Airline_Web_API.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _ticketService;

        public TicketsController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketViewModel>> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<Ticket[]>> GetTickets([FromQuery] int flightId)
        {
            var tickets = await _ticketService.GetTicketsAsync(flightId);

            if (tickets == null)
            {
                return NoContent();
            }

            return Ok(tickets);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] NewTicketModel model)
        {
            var addedSuccessfully = await _ticketService.AddTicketAsync(model);

            if (!addedSuccessfully)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<string>>> Put(int id, [FromBody] TicketViewModel model)
        {
            var updateResult = await _ticketService.UpdateTicketAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<string>>> Delete(int id)
        {
            Response<string> deleteResult = await _ticketService.DeleteTicketAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}