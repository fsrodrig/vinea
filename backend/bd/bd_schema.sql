USE [master]
GO
/****** Object:  Database [Vinea]    Script Date: 25/06/2018 1:27:39 ******/
CREATE DATABASE [Vinea]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Vinea', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\Vinea.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Vinea_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\Vinea_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Vinea] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Vinea].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Vinea] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Vinea] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Vinea] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Vinea] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Vinea] SET ARITHABORT OFF 
GO
ALTER DATABASE [Vinea] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Vinea] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Vinea] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Vinea] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Vinea] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Vinea] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Vinea] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Vinea] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Vinea] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Vinea] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Vinea] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Vinea] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Vinea] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Vinea] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Vinea] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Vinea] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Vinea] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Vinea] SET RECOVERY FULL 
GO
ALTER DATABASE [Vinea] SET  MULTI_USER 
GO
ALTER DATABASE [Vinea] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Vinea] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Vinea] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Vinea] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Vinea] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Vinea', N'ON'
GO
ALTER DATABASE [Vinea] SET QUERY_STORE = OFF
GO
USE [Vinea]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [Vinea]
GO
/****** Object:  Table [dbo].[AccessToken]    Script Date: 25/06/2018 1:27:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccessToken](
	[id] [nvarchar](100) NOT NULL,
	[ttl] [int] NULL,
	[scopes] [nvarchar](50) NULL,
	[created] [datetime] NULL,
	[userId] [int] NULL,
 CONSTRAINT [PK_AccessToken] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ACL]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ACL](
	[model] [nvarchar](255) NULL,
	[property] [nvarchar](255) NULL,
	[accessType] [nvarchar](255) NULL,
	[permission] [nvarchar](255) NULL,
	[principalType] [nvarchar](255) NULL,
	[principalId] [nvarchar](255) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Concepto]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Concepto](
	[cpto_id] [int] IDENTITY(1,1) NOT NULL,
	[cpto_nombre] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[cpto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Egreso]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Egreso](
	[egr_id] [int] IDENTITY(1,1) NOT NULL,
	[egr_fecha] [date] NOT NULL,
	[egr_descripcion] [nvarchar](150) NULL,
	[ope_id] [bigint] NULL,
	[egr_nro_res] [numeric](4, 0) NULL,
	[egr_cambio] [numeric](5, 2) NOT NULL,
	[egr_monto] [numeric](18, 2) NOT NULL,
	[cpto_id] [bigint] NOT NULL,
	[fpgo_id] [bigint] NOT NULL,
 CONSTRAINT [PK__Egreso__89F57176734FFC72] PRIMARY KEY CLUSTERED 
(
	[egr_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FormaDePago]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FormaDePago](
	[fpgo_id] [int] IDENTITY(1,1) NOT NULL,
	[fpgo_nombre] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[fpgo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingreso]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingreso](
	[ing_id] [int] IDENTITY(1,1) NOT NULL,
	[ing_fecha] [date] NOT NULL,
	[ing_descripcion] [nvarchar](150) NULL,
	[ing_pasajero] [nvarchar](50) NULL,
	[ing_nro_res] [numeric](4, 0) NULL,
	[ing_recibo] [nvarchar](12) NULL,
	[ing_cambio] [numeric](5, 2) NOT NULL,
	[ing_monto] [numeric](18, 2) NOT NULL,
	[cpto_id] [bigint] NOT NULL,
	[fpgo_id] [bigint] NOT NULL,
	[ven_id] [bigint] NULL,
 CONSTRAINT [PK__Ingreso__FFC6014AE08AC85A] PRIMARY KEY CLUSTERED 
(
	[ing_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operador]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operador](
	[ope_id] [int] IDENTITY(1,1) NOT NULL,
	[ope_nombre] [nvarchar](50) NOT NULL,
	[ope_cuit] [numeric](11, 0) NOT NULL,
	[ope_fecha_baja] [date] NULL,
 CONSTRAINT [PK__Operador__73A7AA0105E779B2] PRIMARY KEY CLUSTERED 
(
	[ope_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NULL,
	[created] [datetime] NULL,
	[modified] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleMapping]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleMapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[principalType] [nvarchar](255) NULL,
	[principalId] [nvarchar](255) NULL,
	[roleId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[usr_id] [int] IDENTITY(1,1) NOT NULL,
	[usr_username] [nvarchar](20) NOT NULL,
	[usr_email] [nvarchar](50) NOT NULL,
	[usr_nombre] [nvarchar](50) NOT NULL,
	[usr_apellido] [nvarchar](50) NOT NULL,
	[usr_dni] [numeric](8, 0) NOT NULL,
	[usr_cuil] [numeric](11, 0) NOT NULL,
	[usr_direccion] [nvarchar](100) NOT NULL,
	[usr_telefono] [numeric](15, 0) NOT NULL,
	[usr_fecha_nacimiento] [date] NOT NULL,
	[usr_legajo] [numeric](2, 0) NOT NULL,
	[usr_foto] [nvarchar](1000) NULL,
	[usr_emailVerified] [bit] NULL,
	[usr_password] [nvarchar](255) NOT NULL,
	[usr_verificationToken] [nvarchar](255) NULL,
	[usr_realm] [nvarchar](255) NULL,
	[usr_fecha_alta] [date] NOT NULL,
	[usr_fecha_baja] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[usr_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendedor]    Script Date: 25/06/2018 1:27:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendedor](
	[ven_id] [int] IDENTITY(1,1) NOT NULL,
	[ven_nombre] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ven_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[AccessToken] ([id], [ttl], [scopes], [created], [userId]) VALUES (N'1Y28a1HmvwFFbY43Vrci8gggJaRx8evGlAKndfH41duHHHNafalvqCysO28Tp8eX', 1209600, NULL, CAST(N'2018-06-24T15:05:03.253' AS DateTime), 1)
INSERT [dbo].[AccessToken] ([id], [ttl], [scopes], [created], [userId]) VALUES (N'tJXmDrjBa0pAGYoZHDPesXHMBVaJn5NUFiLLIVnPDbpTkcecDDlavBsrSJdDKcTU', 1209600, NULL, CAST(N'2018-06-24T05:02:58.763' AS DateTime), 1)
INSERT [dbo].[AccessToken] ([id], [ttl], [scopes], [created], [userId]) VALUES (N'XCTH4XDEDHU78vSCUxNrEb1LrX2XN5enECQBEjoRsFu8a26bzPz5tyEru49XaGOc', 1209600, NULL, CAST(N'2018-06-24T23:21:48.457' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Concepto] ON 

INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (1, N'Reserva')
INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (2, N'Execsoft')
INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (3, N'PSA')
INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (4, N'Gasto')
INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (5, N'Aporte')
INSERT [dbo].[Concepto] ([cpto_id], [cpto_nombre]) VALUES (6, N'Otro')
SET IDENTITY_INSERT [dbo].[Concepto] OFF
SET IDENTITY_INSERT [dbo].[FormaDePago] ON 

INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (1, N'Pesos')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (2, N'Dólares')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (3, N'Euros')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (4, N'Cheque')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (5, N'Depósito')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (6, N'Transferencia')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (7, N'Tarjeta MP')
INSERT [dbo].[FormaDePago] ([fpgo_id], [fpgo_nombre]) VALUES (8, N'Tarjeta OP')
SET IDENTITY_INSERT [dbo].[FormaDePago] OFF
SET IDENTITY_INSERT [dbo].[Operador] ON 

INSERT [dbo].[Operador] ([ope_id], [ope_nombre], [ope_cuit], [ope_fecha_baja]) VALUES (1, N'Delfos', CAST(30710493657 AS Numeric(11, 0)), NULL)
INSERT [dbo].[Operador] ([ope_id], [ope_nombre], [ope_cuit], [ope_fecha_baja]) VALUES (3, N'Igmar', CAST(20358780351 AS Numeric(11, 0)), NULL)
SET IDENTITY_INSERT [dbo].[Operador] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([usr_id], [usr_username], [usr_email], [usr_nombre], [usr_apellido], [usr_dni], [usr_cuil], [usr_direccion], [usr_telefono], [usr_fecha_nacimiento], [usr_legajo], [usr_foto], [usr_emailVerified], [usr_password], [usr_verificationToken], [usr_realm], [usr_fecha_alta], [usr_fecha_baja]) VALUES (1, N'fsrodrig', N'fs.rodriguez91@gmail.com', N'Federico', N'Rodriguez', CAST(35878035 AS Numeric(8, 0)), CAST(20358780351 AS Numeric(11, 0)), N'Moldes Cnel. 814 - Ciudad', CAST(2616855074 AS Numeric(15, 0)), CAST(N'1991-04-01' AS Date), CAST(1 AS Numeric(2, 0)), NULL, NULL, N'$2a$10$17bZsSOB4P9fYuRLGFE4r.37hiO7tDEWoqyahtaqpKHdZfM.kWea.', NULL, NULL, CAST(N'2018-06-24' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
SET IDENTITY_INSERT [dbo].[Vendedor] ON 

INSERT [dbo].[Vendedor] ([ven_id], [ven_nombre]) VALUES (1, N'Facundo')
INSERT [dbo].[Vendedor] ([ven_id], [ven_nombre]) VALUES (2, N'Fernanda')
INSERT [dbo].[Vendedor] ([ven_id], [ven_nombre]) VALUES (3, N'Nadia')
INSERT [dbo].[Vendedor] ([ven_id], [ven_nombre]) VALUES (4, N'Natalia')
INSERT [dbo].[Vendedor] ([ven_id], [ven_nombre]) VALUES (5, N'Silvana')
SET IDENTITY_INSERT [dbo].[Vendedor] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [Operador_unico]    Script Date: 25/06/2018 1:27:40 ******/
CREATE UNIQUE NONCLUSTERED INDEX [Operador_unico] ON [dbo].[Operador]
(
	[ope_nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Operador_unique]    Script Date: 25/06/2018 1:27:40 ******/
CREATE UNIQUE NONCLUSTERED INDEX [Operador_unique] ON [dbo].[Operador]
(
	[ope_cuit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [principalId_NONCLUSTERED_ASC_idx]    Script Date: 25/06/2018 1:27:40 ******/
CREATE NONCLUSTERED INDEX [principalId_NONCLUSTERED_ASC_idx] ON [dbo].[RoleMapping]
(
	[principalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [Vinea] SET  READ_WRITE 
GO
