﻿CREATE TABLE [dbo].[Airports] (
    [AirportId] INT          IDENTITY (1, 1) NOT NULL,
    [Name]       VARCHAR (50) NOT NULL,
    [City]       VARCHAR (50) NOT NULL,
    [Country]    VARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([AirportId] ASC)
);

