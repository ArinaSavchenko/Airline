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
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public UsersController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateUserModel model)
        {
            Response<string> updateResult = await _userService.UpdateUserAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [Authorize]
        [HttpPut("update-password/{id}")]
        public async Task<ActionResult> ChangePassword(int id, [FromBody] ChangePasswordModel model)
        {
            Response<string> updateResult = await _userService.ChangePasswordAsync(id, model);

            if (updateResult.Success == false)
            {
                return BadRequest(updateResult);
            }

            return Ok(updateResult);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            Response<User> authorizationResult = await _userService.AuthenticateAsync(model);

            if (authorizationResult.Success == false)
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
            Response<string> registrationResult = await _userService.RegisterAsync(model);

            if (registrationResult.Success == false)
            {
                return BadRequest(registrationResult);
            }

            return Ok(registrationResult);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var deleteResult = await _userService.DeleteUserAsync(id);

            if (deleteResult.Success == false)
            {
                return BadRequest(deleteResult);
            }

            return Ok(deleteResult);
        }
    }
}
