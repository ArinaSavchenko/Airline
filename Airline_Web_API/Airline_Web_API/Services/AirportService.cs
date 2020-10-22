using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Airline_Web_API.ViewModels;
using Airline_Web_API.Services;
using Airline_Web_API.Models;

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

        public async Task<IEnumerable<AirportViewModel>> GetAirports(string value)
        {
            var airports = _context.Airports.AsQueryable();

            if (!string.IsNullOrEmpty(value))
            {
                var airportsByName = airports.Where(airport => airport.Name.Contains(value));
                var airportsByCity = airports.Where(airport => airport.City.Contains(value));
                airports = airportsByName.Union(airportsByCity);
            }

            var airportsSearchResults = await airports
                .OrderBy(airport => airport.Id)
                .ToListAsync();

            var results = _mapper.Map<List<AirportViewModel>>(airportsSearchResults);

            return results;
        }
    }
}
