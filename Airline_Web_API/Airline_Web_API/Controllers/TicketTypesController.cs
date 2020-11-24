using System.Collections.Generic;
using System.Threading.Tasks;
using Airline_Web_API.Helpers;
using Airline_Web_API.Services;
using Airline_Web_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Airline_Web_API.Controllers
{
    [Route("api/ticket-types")]
    [ApiController]
    [Authorize(Roles = "admin")]
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

            return Ok(ticketTypes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketTypeViewModel>> GetTicketType(int id)
        {
            var ticketType = await _ticketTypeService.GetTicketTypeByIdAsync(id);

            if (ticketType == null)
            {
                return NotFound();
            }

            return Ok(ticketType);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TicketTypeViewModel model)
        {
            await _ticketTypeService.AddTicketTypeAsync(model);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<string>>> Put(int id, [FromBody] TicketTypeViewModel model)
        {
            var updateResult = await _ticketTypeService.UpdateTicketTypeAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<string>>> Delete(int id)
        {
            Response<string> deleteResult = await _ticketTypeService.DeleteTicketTypeAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}
