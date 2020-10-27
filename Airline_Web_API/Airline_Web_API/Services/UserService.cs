using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Airline_Web_API.DTOs;
using Airline_Web_API.Models;
using Airline_Web_API.Helpers;
using Airline_Web_API.ViewModels;

namespace Airline_Web_API.Services
{
    public class UserService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public UserService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserViewModel> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            return _mapper.Map<UserViewModel>(user);
        }

        /*public async Task<string> UpdateUserAsync()
        {

        }*/

        public async Task<Response<string>> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such user"
                };
            }

            _context.Remove(user);
            _context.SaveChanges();

            return new Response<string>
            {
                Success = true,
                Message = "User was succesfully deleted"
            };
        }

        public async Task<Response<User>> AuthenticateAsync(AuthenticateModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
            {
                return new Response<User>
                {
                    Success = false,
                    Message = "There is no user with such email"
                };
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return new Response<User>
                {
                    Success = false,
                    Message = "Password is incorrect"
                };
            }

            return new Response<User>
            {
                Message = "User authorized",
                Data = user
            };
        }

        public async Task<Response<string>> RegisterAsync(RegisterModel model)
        {
            if (_context.Users.Any(x => x.Email == model.Email))
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "User with such email already exists"
                };
            }
                
            model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var newUser = _mapper.Map<User>(model);

            await _context.AddAsync(newUser);
            await _context.SaveChangesAsync();

            string userFullName = $"{newUser.FirstName} {newUser.LastName}";

            return new Response<string>
            {
                Message = "User was successfully added",
                Data = userFullName
            };
        }
    }
}
