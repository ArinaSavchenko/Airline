﻿CREATE TABLE [dbo].[Tickets]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[FlightId] INT NOT NULL,
	[TicketTypeId] INT NOT NULL,
	[Price] MONEY NOT NULL,
	[TotalTicketsNumber] INT NOT NUll,
	[TicketsLeftNumber] INT NOT NULL,
	FOREIGN KEY ([FlightId]) REFERENCES [dbo].Flights ([Id]),
	FOREIGN KEY ([TicketTypeId]) REFERENCES [dbo].TicketTypes ([Id]),
)
