using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Airline_Web_API.Models;
using Airline_Web_API.DTOs;
using Airline_Web_API.Services;
using Airline_Web_API.Helpers;
using Microsoft.AspNetCore.Authorization;

using System.Net;

namespace Airline_Web_API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly JwtService _jwtService;
        public UsersController(AccountService accountService, JwtService jwtService)
        {
            _accountService = accountService;
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<Response<string>>> Authenticate([FromBody] AuthenticateModel model)
        {
            Response<User> authorizationResult = await _accountService.AuthenticateAsync(model);

            if(authorizationResult.Data == null)
            {
                return Ok(authorizationResult);
            }

            string tokenString = _jwtService.GenerateJwtToken(authorizationResult.Data);

            var result = new Response<string>
            {
                Status = (int)HttpStatusCode.OK,
                Message = authorizationResult.Message,
                Data = tokenString
            };

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Response<string>>> Register([FromBody] RegisterModel model)
        {
            Response<string> registrationResult = await _accountService.RegisterAsync(model);

            return registrationResult;
        }
    }
}
