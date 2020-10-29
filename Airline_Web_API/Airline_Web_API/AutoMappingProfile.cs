using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.Models;
using Airline_Web_API.ViewModels;
using Airline_Web_API.DTOs;
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
            CreateMap<RegisterModel, User>();
            CreateMap<User, UserViewModel>();
            CreateMap<AuthenticateModel, User>();
            CreateMap<UpdateUserModel, User>()
                .ForMember(user => user.Password, opt => opt.Ignore())
                .ForMember(user => user.Role, opt => opt.Ignore());
        }
    }
}
