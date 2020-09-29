CREATE TABLE [dbo].[Flights] (
[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
[DepartureAirportId] INT NOT NULL,
[ArrivalAirportId] INT  NOT NULL,
[DepartureDate] DATETIME NOT NULL,
[ArrivalDate] DATETIME NOT NULL,
FOREIGN KEY ([ArrivalAirportId]) REFERENCES [dbo].[Airports] ([Id]),
FOREIGN KEY ([DepartureAirportId]) REFERENCES [dbo].[Airports] ([Id])
);

