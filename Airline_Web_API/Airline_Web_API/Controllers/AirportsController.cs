﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;

namespace Airline_Web_API.Controllers
{
    [Route("api/airports")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly AirlineContext _context;

        public AirportsController(AirlineContext context)
        {
            _context = context;
        }

        // GET: api/airports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airport>>> GetAirports([FromQuery] string value)
        {
            var airports = _context.Airports.AsQueryable();

            if (!string.IsNullOrEmpty(value))
            {
                var airportsByName = airports.Where(airport => airport.Name.Contains(value));
                var airportsByCity = airports.Where(airport => airport.City.Contains(value));
                airports = airportsByName.Union(airportsByCity);
            }

            var airportsSearchResults = await airports.OrderBy(airport => airport.Id).ToListAsync(); 

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Airport, AirportViewModel>());
            var mapper = new Mapper(config);

            var result = mapper.Map<List<AirportViewModel>>(airportsSearchResults); 

            return Ok (result);
        }
    }
}
