CREATE TABLE [dbo].[Seats]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [AirplaneId] INT NOT NULL,
    [Column] NVARCHAR(10) NOT NULL,
    [SectorName] NVARCHAR(10) NOT NULL,
    [SectorNumber] INT NOT NULL,
    [Number] INT NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    FOREIGN KEY ([AirplaneId]) REFERENCES [dbo].Airplanes ([Id])
)
