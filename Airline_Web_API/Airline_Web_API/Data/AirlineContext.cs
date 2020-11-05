using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Airline_Web_API.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Airline_Web_API.Models
{
    public class AirlineContext: DbContext
    {
        public DbSet<Airport> Airports { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Airplane> Airplanes { get; set; }

        public AirlineContext(DbContextOptions<AirlineContext> options):
            base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>()
                .HasOne<Airport>(f => f.DepartureAirport)
                .WithMany(a => a.FlightsFrom)
                .HasForeignKey(f => f.DepartureAirportId);

            modelBuilder.Entity<Flight>()
                .HasOne<Airport>(f => f.ArrivalAirport)
                .WithMany(a => a.FlightsTo)
                .HasForeignKey(f => f.ArrivalAirportId);

       /*     modelBuilder.Entity<Flight>()
                .HasOne<Airplane>(f => f.Airplane)
                .WithMany(a => a.Flights)
                .HasForeignKey(f => f.AirplaneId);*/

            modelBuilder.Entity<Ticket>()
                .HasOne<Flight>(t => t.Flight)
                .WithMany(f => f.Tickets)
                .HasForeignKey(t => t.FlightId);

            modelBuilder.Entity<Ticket>()
                .HasOne<TicketType>(t => t.TicketType)
                .WithMany(tt => tt.Tickets)
                .HasForeignKey(t => t.TicketTypeId);

            modelBuilder.Entity<Seat>()
                .HasOne<Airplane>(s => s.Airplane)
                .WithMany(a => a.Seats)
                .HasForeignKey(s => s.AirplaneId);

            modelBuilder.Entity<Seat>()
                .HasOne<Airplane>(s => s.Airplane)
                .WithMany(a => a.Seats)
                .HasForeignKey(s => s.AirplaneId);
        }
    }
}
