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
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult> PostUser(UserForRegistration user)
        {
            var results =  await _userService.AddUser(user);
            return Ok(results);
        }
    }
}
