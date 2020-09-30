CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[CarryOnBagsNumber] INT NULL,
	[CarryOnBagsMaxWeight] INT NULL,
	[BaggageNumber] INT NULL,
	[BaggageMaxWaight] BIT NULL,
	[SeatReservation] BIT NOT NULL,
	[Changes] BIT NOT NULL,
	[Refund] NVARCHAR(50) NULL, 
    [SeatType] NVARCHAR(50) NOT NULL
)
