using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Airline_Web_API.DTOs
{
    [Route("api/selected-seats")]
    [ApiController]
    public class SelectedSeatsController : ControllerBase
    {
        private readonly IHubContext<SeatsLockHub> _hubContext;

        public SelectedSeatsController(IHubContext<SeatsLockHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
    }
}
