CREATE TABLE [dbo].[TicketTypes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[CarryOnBagsNumber] INT NULL,
	[CarryOnBagMaxWeight] INT NULL,
	[BaggageNumber] INT NULL,
	[BaggageMaxWeight] INT NULL,
	[PricePerExtraCarryOnBag] MONEY NULL,
	[PricePerExtraCarryOnBagKg] MONEY NULL,
	[PricePerExtraBaggage] MONEY NOT NULL,
	[PricePerExtraBaggageKg] MONEY NULL,
	[SeatReservation] BIT NULL,
	[Changes] BIT NULL,
	[Refund] NVARCHAR(250) NULL, 
	[SeatType] NVARCHAR(250) NULL, 
    [Status] NVARCHAR(250) NULL
)
