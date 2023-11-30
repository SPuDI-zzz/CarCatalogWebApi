using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CarCatalog.Shared.Settings;
using CarCatalog.Dal.EntityFramework.Factories;

namespace CarCatalog.Dal.EntityFramework;

/// <summary>
///     A static class responsible for bootstrapping and configuring services related to the application's database context.
/// </summary>
public static class Bootstrapper
{
    /// <summary>
    ///     Adds the application's database context to the service collection with the specified configuration.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to which the database context services will be added.</param>
    /// <param name="configuration">The <see cref="IConfiguration"/> containing application settings.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added database context services.</returns>
    public static IServiceCollection AddAppDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        var settings = Settings.Load<DbSettings>("ConnectionStrings", configuration);
        services.AddSingleton(settings);

        var dbInitOptionsDelegate = DbContextOptionsFactory.Configure(settings.DefaultConnection);

        services.AddDbContextFactory<MainDbContext>(dbInitOptionsDelegate);
        return services;
    }
}
