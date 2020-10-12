using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Airline_Web_API.Models;
using Airline_Web_API.DTOs;
using Airline_Web_API.Services;
using Airline_Web_API.Helpers;
using Microsoft.EntityFrameworkCore.Infrastructure;

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
            if (!ModelState.IsValid)
            {
                var response = new Response<string>
                {
                    Status = HttpStatusCode.BadRequest,
                    Message = "Model is not valid"
                };

                return base.StatusCode((int)response.Status, response);
            }

            Response<User> authorizationResult = await _accountService.AuthenticateAsync(model);

            if (authorizationResult.Status != HttpStatusCode.OK)
            {
                return base.StatusCode((int)authorizationResult.Status, authorizationResult);
            }

            string tokenString = _jwtService.GenerateJwtToken(authorizationResult.Data);

            var result = new Response<string>
            {
                Status = HttpStatusCode.OK,
                Message = authorizationResult.Message,
                Data = tokenString
            };

            return base.StatusCode((int)result.Status, result); ;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Response<string>>> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var response = new Response<string>
                {
                    Status = HttpStatusCode.BadRequest,
                    Message = "Model is not valid"
                };

                return base.StatusCode((int)response.Status, response); ;
            }

            Response<string> registrationResult = await _accountService.RegisterAsync(model);

            if (registrationResult == null)
            {
                var response = new Response<string>
                {
                    Status = HttpStatusCode.BadRequest,
                    Message = "Registration failed"
                };

                return base.StatusCode((int)response.Status, response);
            }

            return base.StatusCode((int)registrationResult.Status, registrationResult);
        }
    }
}
