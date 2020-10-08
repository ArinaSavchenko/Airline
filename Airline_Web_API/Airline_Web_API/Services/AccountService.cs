using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

using Microsoft.EntityFrameworkCore;

using AutoMapper;

using Airline_Web_API.DTOs;
using Airline_Web_API.Models;
using Airline_Web_API.Helpers;

using System.Net;

namespace Airline_Web_API.Services
{
    public class AccountService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public AccountService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public async Task<Response<User>> AuthenticateAsync(AuthenticateModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
                return new Response<User>
                {
                    Status = (int)HttpStatusCode.NotFound,
                    Message = "There is no user with such email"
                };

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return new Response<User>
                {
                    Status = (int)HttpStatusCode.NotFound,
                    Message = "Password is incorrect"
                };

            return new Response<User>
            {
                Status = (int)HttpStatusCode.OK,
                Message = "User authorized",
                Data = user
            };
        }

        public async Task<Response<string>> RegisterAsync(RegisterModel model)
        {
            if (_context.Users.Any(x => x.Email == model.Email))
            {
                return new Response<String>
                {
                    Status = (int)HttpStatusCode.BadRequest,
                    Message = "User with such email already exists"
                };
            }
                
            model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var newUser = _mapper.Map<User>(model);

            await _context.AddAsync(newUser);
            await _context.SaveChangesAsync();

            string userFullName = newUser.FirstName + " " + newUser.LastName;

            return new Response<string>
            {
                Status = (int)HttpStatusCode.OK,
                Message = "User was siccessfully added",
                Data = userFullName
            };
        }

    }
}
