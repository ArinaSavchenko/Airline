CREATE TABLE [dbo].[FlightSeatsReservation]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[BookedTicketId] INT NOT NULL,
	[SeatId] INT NOT NULL,
	FOREIGN KEY ([BookedTicketId]) REFERENCES [dbo].BookedTickets ([Id]),
	FOREIGN KEY ([SeatId]) REFERENCES [dbo].Seats ([Id])
)
