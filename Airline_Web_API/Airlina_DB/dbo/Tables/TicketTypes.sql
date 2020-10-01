CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[CarryOnBagsNumber] INT NULL,
	[CarryOnBagsMaxWeight] INT NULL,
	[BaggageNumber] INT NULL,
	[BaggageMaxWeight] BIT NULL,
	[SeatReservation] BIT NOT NULL,
	[Changes] BIT NOT NULL,
	[Refund] BIT NOT NULL, 
	[SeatType] NVARCHAR(50) NOT NULL
)
