CREATE TABLE [dbo].[Flights] (
[FlightId] INT  IDENTITY (1, 1) NOT NULL,
[DepartureAirportId] INT NOT NULL,
[ArrivalAirportId] INT  NOT NULL,
[DepartureDate] DATE NOT NULL,
[ArrivalDate] DATE NOT NULL,
PRIMARY KEY CLUSTERED ([FlightId] ASC),
FOREIGN KEY ([ArrivalAirportId]) REFERENCES [dbo].[Airports] ([AirportId]),
FOREIGN KEY ([DepartureAirportId]) REFERENCES [dbo].[Airports] ([AirportId])
);

