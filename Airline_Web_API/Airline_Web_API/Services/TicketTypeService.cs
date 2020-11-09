using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Airline_Web_API.Services
{
    public class TicketTypeService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public TicketTypeService(AirlineContext airlineContext, IMapper mapper)
        {
            _context = airlineContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketTypeViewModel>> GetTicketTypesAsync()
        {
            var ticketTypes = await _context.TicketTypes.ToListAsync();

            var result = _mapper.Map<List<TicketTypeViewModel>>(ticketTypes);

            return result;
        }

        public async Task<TicketTypeViewModel> GetTicketTypeByIdAsync(int id)
        {
            var ticketType = await _context.TicketTypes.FindAsync(id);

            var result = _mapper.Map<TicketTypeViewModel>(ticketType);

            return result;
        }

        public async Task AddTicketTypeAsync(TicketTypeViewModel model)
        {
            var ticketType = _mapper.Map<TicketType>(model);

            _context.TicketTypes.Add(ticketType);
            await _context.SaveChangesAsync();
        }
    }
}
