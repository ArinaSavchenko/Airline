CREATE TABLE [dbo].[BookedTickets]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TicketId] INT NOT NULL,
	[UserId] INT NOT NULL,
	[Passport] NVARCHAR(250) NOT NULL,
	[PassengerFirstName] NVARCHAR(250) NOT NULL,
	[PassengerLastName] NVARCHAR(250) NOT NULL,
	[CarryOnBagsNumber] INT NOT NULL,
	[BaggageNumber] INT NOT NULL,
	[ExtraCarryOnBagNumber] INT NOT NULL,
	[ExtraBaggageNumber] INT NOT NULL,
	[TotalPrice] MONEY NOT NULL,
	[Status] NVARCHAR(250) NOT NULL,
	FOREIGN KEY ([TicketId]) REFERENCES [dbo].Tickets ([Id]),
	FOREIGN KEY ([UserId]) REFERENCES [dbo].Users ([Id])
)