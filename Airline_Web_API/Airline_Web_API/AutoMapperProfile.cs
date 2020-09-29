using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using AutoMapper;

namespace Airline_Web_API
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
                CreateMap<Airport, AirportViewModel>();
                CreateMap<TicketType, TicketTypeViewModel>();
                CreateMap<Ticket, TicketsViewModel>();
                CreateMap<Flight, FlightViewModel>();
        }
    }
}
