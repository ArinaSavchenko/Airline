using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Route("api/ticket-types")]
    [ApiController]
    public class TicketTypesController : ControllerBase
    {
        private readonly TicketTypeService _ticketTypeService;
        public TicketTypesController(TicketTypeService ticketTypeService)
        {
            _ticketTypeService = ticketTypeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketTypeViewModel>>> GetTicketTypes()
        {
            var ticketTypes = await _ticketTypeService.GetTicketTypesAsync();

            if (ticketTypes == null)
            {
                return NoContent();
            }

            return Ok(ticketTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketTypeViewModel>> GetTicketType(int id)
        {
            var ticketType = await _ticketTypeService.GetTicketTypeByIdAsync(id);

            if (ticketType == null)
            {
                return NoContent();
            }

            return Ok(ticketType);
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult> PostTicketType([FromBody] TicketTypeViewModel model)
        {
            await _ticketTypeService.AddTicketTypeAsync(model);

            return Ok();
        }

        // PUT api/<TicketTypesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TicketTypesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
