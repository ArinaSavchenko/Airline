using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Helpers;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Airline_Web_API.Services
{
    public class AirplaneService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public AirplaneService(AirlineContext airlineContext, IMapper mapper)
        {
            _context = airlineContext;
            _mapper = mapper;
        }

        public async Task<AirplaneViewModel> GetAirplaneByIdAsync(int id)
        {
            var airport = await _context.Airplanes.FindAsync(id);

            var results = _mapper.Map<AirplaneViewModel>(airport);

            return results;
        }

        public async Task<IEnumerable<AirplaneViewModel>> GetAirplanesAsync(string name)
        {
            var airplanes = _context.Airplanes.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                airplanes = airplanes.Where(airplane => airplane.Name.Contains(name));
            }

            var airplanesSearchResults = await airplanes
                .OrderBy(airplane => airplane.Name)
                .ToListAsync();

            var results = _mapper.Map<List<AirplaneViewModel>>(airplanesSearchResults);

            return results;
        }

        public async Task<int> AddAirplaneAsync(AirplaneViewModel model)
        {
            var airplane = _mapper.Map<Airplane>(model);
            _context.Airplanes.Add(airplane);
            await _context.SaveChangesAsync();

            return airplane.Id;
        }

        public async Task<Response<string>> UpdateAirplaneAsync(AirplaneViewModel model)
        {
            var airplane = await _context.Airplanes.FindAsync(model.Id);

            if (airplane == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such airplane"
                };
            }

            _mapper.Map(model, airplane);
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Aiplane was succesfully updated"
            };
        }

        public async Task<Response<string>> DeleteAirplaneAsync(int id)
        {
            var airplane = await _context.Airplanes.FindAsync(id);

            if (airplane == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such airplane"
                };
            }

            airplane.Status = "Deleted";
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Airplane was succesfully deleted"
            };
        }
    }
}
