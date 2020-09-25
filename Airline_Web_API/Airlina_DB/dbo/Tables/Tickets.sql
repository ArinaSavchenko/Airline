CREATE TABLE [dbo].[Tickets]
(
	[TicketId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[FlightId] INT NOT NULL,
	[TicketTypeId] INT NOT NULL,
	[Price] MONEY NOT NULL,
	[TotalNumber] INT NOT NUll,
	[TicketsLeft] INT NOT NULL,
	FOREIGN KEY ([FlightId]) REFERENCES [dbo].Flights ([FlightId]),
	FOREIGN KEY ([TicketTypeId]) REFERENCES [dbo].TicketTypes ([TicketTypeId]),
)
