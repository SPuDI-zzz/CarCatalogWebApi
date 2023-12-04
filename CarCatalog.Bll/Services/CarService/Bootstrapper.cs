using CarCatalog.Dal.Repositories.CarRepository;
using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Bll.Services.CarService;

/// <summary>
///     Static class responsible for bootstrapping and configuring services related to car-related operations.
/// </summary>
public static class Bootstrapper
{
    /// <summary>
    ///     Adds car-related services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to which car-related services will be added.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added car-related services.</returns>
    public static IServiceCollection AddCarService(this IServiceCollection services)
    {
        services.AddCarRepository();

        services.AddScoped<ICarService, CarService>();

        return services;
    }
}
