using CarCatalog.Dal.Repositories.CarRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Bil.Services.CarService;

public static class Bootstrapper
{
    public static IServiceCollection AddCarService(this IServiceCollection services)
    {
        services.AddCarRepository();

        services.AddScoped<ICarService, CarService>();

        return services;
    }
}
