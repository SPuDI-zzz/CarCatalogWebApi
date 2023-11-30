﻿namespace CarCatalog.Dal.EntityFramework.Factories;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

/// <summary>
///     Factory class for creating instances of the <see cref="MainDbContext"/> during design-time operations.
/// </summary>
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MainDbContext>
{
    /// <inheritdoc />
    public MainDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var options = new DbContextOptionsBuilder<MainDbContext>()
            .UseNpgsql(configuration.GetConnectionString("DefaultConnection"));


        return new MainDbContext(options.Options);
    }
}
