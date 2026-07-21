FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore
COPY src/Server/I-Grid.Server.csproj src/Server/
RUN dotnet restore src/Server/I-Grid.Server.csproj

# Copy source and build
COPY src/Server/ src/Server/
RUN dotnet publish src/Server/I-Grid.Server.csproj -c Release -o /app --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published output
COPY --from=build /app .

# Expose ports
EXPOSE 5000

# Set environment
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "I-Grid.Server.dll"]
