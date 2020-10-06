using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Airline_Web_API.Models;
using Airline_Web_API.DTOs;
using Airline_Web_API.Services;

namespace Airline_Web_API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AccountService _userService;

        public UsersController(AccountService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> PostUser(RegisterModel model)
        {
            await _userService.AddUser(model);
            return Ok();
        }
    }
}
