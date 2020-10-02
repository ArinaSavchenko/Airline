using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;

namespace Airline_Web_API.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public TicketsController(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(int id)
        {
            var ticket = _context.Tickets
                .Include(ticket => ticket.TicketType)
                .Where(ticket => ticket.Id == id)
                .FirstOrDefault();

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TicketsViewModel>(ticket));
        }
    }
}