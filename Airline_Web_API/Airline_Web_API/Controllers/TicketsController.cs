﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using System.Threading.Tasks;
using Airline_Web_API.Services;

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
    }
}