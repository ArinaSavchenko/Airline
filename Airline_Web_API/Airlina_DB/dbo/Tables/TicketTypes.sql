CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] VARCHAR(50) NOT NULL,
	[Carry_on_bag] VARCHAR(250) NULL,
	[Baggage] VARCHAR(250),
	[Seat_reservation] VARCHAR(250) NULL,
	[Changes] VARCHAR(250) NULL,
	[Refund] VARCHAR(250) NULL
)
