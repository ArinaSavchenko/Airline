﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[FirstName] NVARCHAR(100) NOT NULL,
	[LastName] NVARCHAR(100) NOT NULL,
	[BirthDate] DATETIME NOT NULL,
	[Email] NVARCHAR(100) NOT NULL,
	[Password] NVARCHAR(MAX) NOT NULL,
	[Role] NVARCHAR(50) NOT NULL,
    [Status] NVARCHAR(10) NULL
)
