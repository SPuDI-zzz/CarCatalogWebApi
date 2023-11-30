using CarCatalog.Dal.Entities;
using CarCatalog.Dal.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Dal.Repositories.CarRepository;

public static class Bootstrapper
{
    public static IServiceCollection AddCarRepository(this IServiceCollection services)
    {
        services.AddScoped<IRepository<Car>, CarRepository>();

        return services;
    }
}
