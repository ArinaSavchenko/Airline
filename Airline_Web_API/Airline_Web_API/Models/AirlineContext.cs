using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Airline_Web_API.Models
{
    public class AirlineContext: DbContext
    {
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
        }

        public DbSet<Airport> Airports { get; set; }
        public DbSet<Flight> Flights { get; set; }
    }
}
