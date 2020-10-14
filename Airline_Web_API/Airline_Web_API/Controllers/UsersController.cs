using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Airline_Web_API.Models;
using Airline_Web_API.DTOs;
using Airline_Web_API.Services;
using Airline_Web_API.Helpers;

namespace Airline_Web_API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ApiController
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
        public async Task<ActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            Response<User> authorizationResult = await _accountService.AuthenticateAsync(model);

            if (authorizationResult.Data == null)
            {
                return BadRequest(authorizationResult);
            }

            string tokenString = _jwtService.GenerateJwtToken(authorizationResult.Data);

            var result = new Response<string>
            {
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

            if (registrationResult.Data == null)
            {
                return BadRequest(registrationResult);
            }

            return Ok(registrationResult);
        }
    }
}
