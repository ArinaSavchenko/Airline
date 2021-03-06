﻿using Airline_Web_API.DTOs;
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
    public class BookedTicketService
    {
        private readonly AirlineContext _context;
        private readonly IMapper _mapper;

        public BookedTicketService(AirlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BookedTicketViewModel> GetBookedTicketByIdAsync(int id)
        {
            var bookedTicket = await _context.BookedTickets
                .Include("Ticket.Flight.DepartureAirport")
                .Include("Ticket.Flight.ArrivalAirport")
                .Where(ticket => ticket.Id == id)
                .Select(ticket => new BookedTicketViewModel
                {
                    DepartureCity = ticket.Ticket.Flight.DepartureAirport.City,
                    DepartureCountry = ticket.Ticket.Flight.DepartureAirport.Country,
                    ArrivalCity = ticket.Ticket.Flight.ArrivalAirport.City,
                    ArrivalCountry = ticket.Ticket.Flight.ArrivalAirport.Country,
                    Date = ticket.Ticket.Flight.DepartureDate,
                    PassengerFirstName = ticket.PassengerFirstName,
                    PassengerLastName = ticket.PassengerLastName,
                    CarryOnBagsNumber = ticket.CarryOnBagsNumber,
                    BaggageNumber = ticket.BaggageNumber,
                    TotalPrice = ticket.TotalPrice
                })
                .FirstOrDefaultAsync();

            return bookedTicket;
        }

        public async Task<List<BookedTicketHistoryModel>> GetBookedTicketsByUserIdAsync(int userId)
        {
            var bookedTickets = await _context.BookedTickets
                .Include("Ticket.Flight.DepartureAirport")
                .Include("Ticket.Flight.ArrivalAirport")
                .Where(bookedTicket => bookedTicket.UserId == userId)
                .Select(bookedTicket => new BookedTicketHistoryModel {
                        BookedTicketId = bookedTicket.Id,
                        DepartureCity = bookedTicket.Ticket.Flight.DepartureAirport.City,
                        DepartureCountry = bookedTicket.Ticket.Flight.DepartureAirport.Country,
                        ArrivalCity = bookedTicket.Ticket.Flight.ArrivalAirport.City,
                        ArrivalCountry = bookedTicket.Ticket.Flight.ArrivalAirport.Country,
                        Date = bookedTicket.Ticket.Flight.DepartureDate
                    })
                .ToListAsync();

            return bookedTickets;
        }

        public async Task<List<TicketWasBookedResponseModel>> AddBookedTicketAsync(NewBookedTicketModel[] models)
        {
            var bookedTickets = _mapper.Map<List<BookedTicket>>(models);

            _context.BookedTickets.AddRange(bookedTickets);
            await _context.SaveChangesAsync();

            List<TicketWasBookedResponseModel> reponse = new List<TicketWasBookedResponseModel>();

            foreach (var ticket in bookedTickets)
            {
                reponse.Add(new TicketWasBookedResponseModel { 
                    Id = ticket.Id,
                    PassengerFirstName = ticket.PassengerFirstName,
                    PassengerLastName = ticket.PassengerLastName
                });
            }

            return reponse;
        }
    }
}
