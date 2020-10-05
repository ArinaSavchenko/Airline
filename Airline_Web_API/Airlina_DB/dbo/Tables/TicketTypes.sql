CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[CarryOnBagsNumber] INT NULL,
	[CarryOnBagMaxWeight] INT NULL,
	[BaggageNumber] INT NULL,
	[BaggageMaxWeight] INT NULL,
	[SeatReservation] BIT NOT NULL,
	[Changes] BIT NOT NULL,
	[Refund] BIT NULL, 
	[SeatType] NVARCHAR(50) NOT NULL
)
