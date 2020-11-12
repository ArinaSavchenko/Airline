using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Models;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
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

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] BookedTicket bookedTicket)
        {
            int bookedTicketId = await _bookedTicketService.AddBookedTicketAsync(bookedTicket);

            return Ok(bookedTicketId);
        }
    }
}
