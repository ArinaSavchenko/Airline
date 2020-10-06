using Airline_Web_API.DTOs;
using Airline_Web_API.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task AddUser(RegisterModel model)
        {
            await _context.AddAsync(_mapper.Map<User>(model));
            await _context.SaveChangesAsync();
        }
    }
}
