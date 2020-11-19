using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Models;
using Airline_Web_API.Helpers;
using IdentityServer4.Extensions;

namespace Airline_Web_API.Services
{
    public class AirportService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public AirportService(AirlineContext airlineContext, IMapper mapper)
        {
            _context = airlineContext;
            _mapper = mapper;
        }

        public async Task<AirportViewModel> GetAirportByIdAsync(int id)
        {
            var airport = await _context.Airports.FindAsync(id);

            var result = _mapper.Map<AirportViewModel>(airport);

            return result;
        }

        public async Task<IEnumerable<AirportViewModel>> GetAirportsAsync(string value, string status)
        {
            var airports = _context.Airports.AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                airports = airports.Where(airport => airport.Status == status);
            }

            if (!string.IsNullOrEmpty(value))
            {
                var airportsByName = airports.Where(airport => airport.Name.Contains(value));
                var airportsByCity = airports.Where(airport => airport.City.Contains(value));
                airports = airportsByName.Union(airportsByCity);
            }

            var airportsSearchResults = await airports
                .OrderBy(airport => airport.Id)
                .ToListAsync();

            var results = _mapper.Map<IEnumerable<AirportViewModel>>(airportsSearchResults);

            return results;
        }

        public async Task AddAirportAsync(AirportViewModel model)
        {
            var airport = _mapper.Map<Airport>(model);
            _context.Airports.Add(airport);
            await _context.SaveChangesAsync();
        }

        public async Task<Response<string>> UpdateAirportAsync(int id, AirportViewModel model)
        {
            var airport = await _context.Airports.FindAsync(id);

            if (airport == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such airport"
                };
            }

            _mapper.Map(model, airport);
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Airport was succesfully updated"
            };
        }

        public async Task<Response<string>> DeleteAirportAsync(int id)
        {
            var airport = await _context.Airports.FindAsync(id);

            if (airport == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such airport"
                };
            }

            airport.Status = "Deleted";
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Airport was succesfully deleted"
            };
        }
    }
}
