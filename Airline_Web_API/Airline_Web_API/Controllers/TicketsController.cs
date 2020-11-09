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
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _ticketService;

        public TicketsController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketsViewModel>> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

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

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] NewTicketModel model)
        {
            await _ticketService.AddTicketAsync(model);

            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        public async Task<ActionResult<Response<string>>> Put([FromBody] TicketsViewModel model)
        {
            var updateResult = await _ticketService.UpdateTicketAsync(model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [Authorize(Roles = "admin")]
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