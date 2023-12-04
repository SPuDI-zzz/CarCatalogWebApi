using CarCatalog.Bll.Services.AccountService;
using CarCatalog.Bll.Services.CarService;
using CarCatalog.Bll.Services.UserService;

namespace CarCatalog.Api;

/// <summary>
///     Bootstrapper class responsible for registering application services in the dependency injection container.
/// </summary>
public static class Bootstrapper
{
    /// <summary>
    ///     Registers application services in the provided <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to register services in.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with registered services.</returns>
    public static IServiceCollection RegisterAppServices(this IServiceCollection services)
    {
        services
            .AddCarService()
            .AddUserService()
            .AddAccountService();

        return services;
    }
}
