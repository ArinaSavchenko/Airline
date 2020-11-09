using System;
using System.Collections.Generic;
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
            CreateMap<Airport, AirportUserViewModel>();
            CreateMap<AirportAdminViewModel, Airport>();
            CreateMap<Airport, AirportAdminViewModel>();
            CreateMap<TicketType, TicketTypeViewModel>();
            CreateMap<Ticket, TicketsViewModel>();
            CreateMap<Flight, FlightViewModel>();
            CreateMap<FlightViewModel, Flight>();
            CreateMap<RegisterModel, User>();
            CreateMap<User, UserViewModel>();
            CreateMap<AuthenticateModel, User>();
            CreateMap<UpdateUserModel, User>()
                .ForMember(user => user.Password, opt => opt.Ignore())
                .ForMember(user => user.Role, opt => opt.Ignore());
            CreateMap<Airplane, AirplaneViewModel>();
            CreateMap<AirplaneViewModel, Airplane>();
            CreateMap<Seat, SeatViewModel>();
            CreateMap<SeatViewModel, Seat>();
            CreateMap<NewFlightModel, Flight>();
        }
    }
}
