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
            CreateMap<Airport, AirportViewModel>();
            CreateMap<AirportViewModel, Airport>();
            CreateMap<TicketType, TicketTypeViewModel>();
            CreateMap<TicketTypeViewModel, TicketType>();
            CreateMap<Ticket, TicketViewModel>();
            CreateMap<TicketViewModel, Ticket>();
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
            CreateMap<NewTicketModel, Ticket>();
            CreateMap<NewBookedTicketModel, BookedTicket>()
                .ForMember(ticket => ticket.PassengerFirstName, opt => opt.MapFrom(s => s.PassengerFirstName.ToUpper()))
                .ForMember(ticket => ticket.PassengerLastName, opt => opt.MapFrom(s => s.PassengerLastName.ToUpper()))
                .ForMember(ticket => ticket.Passport, opt => opt.MapFrom(s => s.Passport.ToUpper()));
            CreateMap<BookedTicket, BookedTicketViewModel>();
            CreateMap<BookedTicketViewModel, BookedTicket>();
        }
    }
}
