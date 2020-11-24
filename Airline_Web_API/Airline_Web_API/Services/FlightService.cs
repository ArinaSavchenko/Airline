using Airline_Web_API.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.ViewModels;
using Microsoft.EntityFrameworkCore;
using Airline_Web_API.Helpers;
using Airline_Web_API.DTOs;

namespace Airline_Web_API.Services
{
    public class FlightService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public FlightService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FlightViewModel> GetFlightByIdAsync(int id)
        {
            var flight = await _context.Flights
                .Include(flight => flight.DepartureAirport)
                .Include(flight => flight.ArrivalAirport)
                .Include(flight => flight.Airplane)
                .Where(flight => flight.Id == id)
                .FirstOrDefaultAsync();

            if (flight == null)
            {
                return null;
            }

            var result = _mapper.Map<FlightViewModel>(flight);

            return result;
        }

        public async Task<IEnumerable<FlightViewModel>> GetFlightsAsync(FlightForSearchModel model)
        {
            var flights = _context.Flights
                .Include(flight => flight.DepartureAirport)
                .Include(flight => flight.ArrivalAirport)
                .Include(flight => flight.Tickets)
                    .ThenInclude(ticket => ticket.TicketType)
                .AsQueryable();

            if (model.DepartureAirportId != null)
            {
                flights = flights.Where(flight => flight.DepartureAirportId == model.DepartureAirportId);
            }

            if (model.ArrivalAirportId != null)
            {
                flights = flights.Where(flight => flight.ArrivalAirportId == model.ArrivalAirportId);
            }

            if (model.Date != default(DateTime))
            {
                flights = flights.Where(flight => flight.DepartureDate.Date == model.Date.Date);
            }

            if (!string.IsNullOrEmpty(model.Status))
            {
                flights = flights.Where(flight => flight.Status == model.Status);
            }

            var flightsSearchResults = await flights
                .OrderBy(flight => flight.Id)
                .ToListAsync();

            var results = _mapper.Map<IEnumerable<FlightViewModel>>(flightsSearchResults);

            return results;
        }

        public async Task<int?> AddFlightAsync(NewFlightModel model)
        {
            bool valuesChecked = await CheckExistanceAsync(model.DepartureAirportId, model.ArrivalAirportId, model.AirplaneId);
            
            if (!valuesChecked)
            {
                return null;
            }

            var flight = _mapper.Map<Flight>(model);
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return flight.Id;
        }

        public async Task<Response<string>> UpdateFlightAsync(int id, FlightViewModel model)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such flight"
                };
            }

            bool valuesChecked = await CheckExistanceAsync(model.DepartureAirport.Id, model.ArrivalAirport.Id, model.Airplane.Id);

            if (!valuesChecked)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "Values are invalid"
                };
            }

            _mapper.Map(model, flight);
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "Flight was succesfully updated"
            };
        }

        public async Task<Response<string>> DeleteFlightAsync(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return new Response<string>
                {
                    Success = false,
                    Message = "There is no such flight"
                };
            }

            flight.Status = "Deleted";
            await _context.SaveChangesAsync();

            return new Response<string>
            {
                Success = true,
                Message = "FLight was succesfully deleted"
            };
        }

        public async Task<bool> CheckExistanceAsync(int departureAirportId, int arrivalAirportId, int airplaneId)
        {
            var departureAirport = await _context.Airports.FindAsync(departureAirportId);

            if (departureAirport == null)
            {
                return false;
            }

            var arrivalAirport = await _context.Airports.FindAsync(arrivalAirportId);

            if (arrivalAirport == null)
            {
                return false;
            }

            var airplane = await _context.Airplanes.FindAsync(airplaneId);

            if (airplane == null)
            {
                return false;
            }

            return true;
        }
    }
}
