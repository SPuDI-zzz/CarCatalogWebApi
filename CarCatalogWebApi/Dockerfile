#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["CarCatalog.Api.csproj", "CarCatalogWebApi/"]
COPY ["../CarCatalog.Bil/CarCatalog.Bil.csproj", "CarCatalog.Bil/"]
COPY ["CarCatalog.Dal/CarCatalog.Dal.csproj", "CarCatalog.Dal/"]
COPY ["CarCatalog.Shared/CarCatalog.Shared.csproj", "CarCatalog.Shared/"]
RUN dotnet restore "./CarCatalogWebApi/./CarCatalog.Api.csproj"
COPY . .
WORKDIR "/src/CarCatalogWebApi"
RUN dotnet build "./CarCatalog.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CarCatalog.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarCatalog.Api.dll"]