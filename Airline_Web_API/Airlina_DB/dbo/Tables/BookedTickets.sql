CREATE TABLE [dbo].[BookedTickets]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[TicketId] INT NOT NULL,
	[UserId] INT NOT NULL,
	[Passport] NVARCHAR(250) NOT NULL,
	[PassengerFirstName] NVARCHAR(250) NOT NULL,
	[PassengerLastName] NVARCHAR(250) NOT NULL,
	[CarryOnBagsNumber] INT NULL,
	[CarryOnBagMaxWeight] INT NULL,
	[BaggageNumber] INT NULL,
	[BaggageMaxWeight] INT NULL,
	[Status] NVARCHAR(250) NOT NULL,
	FOREIGN KEY ([TicketId]) REFERENCES [dbo].Tickets ([Id])
)