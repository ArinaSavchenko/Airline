CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[CarryOnBagsNumber] INT NOT NULL,
	[CarryOnBagMaxWeight] INT NOT NULL,
	[BaggageNumber] INT NOT NULL,
	[BaggageMaxWeight] INT NOT NULL,
	[PricePerExtraCarryOnBag] MONEY NOT NULL,
	[PricePerExtraCarryOnBagKg] MONEY NOT NULL,
	[PricePerExtraBaggage] MONEY NOT NULL,
	[PricePerExtraBaggageKg] MONEY NOT NULL,
	[SeatReservation] BIT NOT NULL,
	[Changes] BIT NOT NULL,
	[Refund] NVARCHAR(250) NOT NULL, 
	[SeatType] NVARCHAR(250) NOT NULL
)
