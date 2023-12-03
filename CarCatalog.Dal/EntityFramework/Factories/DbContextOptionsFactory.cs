using Microsoft.EntityFrameworkCore;

namespace CarCatalog.Dal.EntityFramework.Factories;

/// <summary>
///     A static class responsible for creating and configuring DbContext options for a database connection.
/// </summary>
public static class DbContextOptionsFactory
{
    /// <summary>
    ///     Creates and configures DbContext options for a PostgreSQL database connection.
    /// </summary>
    /// <param name="connectionString">The connection string for the PostgreSQL database.</param>
    /// <returns>An <see cref="Action{T}"/> containing the configuration for DbContext options.</returns>
    public static Action<DbContextOptionsBuilder> Configure(string connectionString)
    {
        return builder =>
        {
            builder.UseNpgsql(connectionString);
            builder.EnableSensitiveDataLogging();
            builder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        };
    }
}
