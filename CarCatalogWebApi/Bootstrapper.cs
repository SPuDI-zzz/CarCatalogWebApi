using CarCatalog.Bil.Services.AccountService;
using CarCatalog.Bil.Services.CarService;
using CarCatalog.Bil.Services.UserService;

namespace CarCatalog.Api;

public static class Bootstrapper
{
    public static IServiceCollection RegisterAppServices(this IServiceCollection services)
    {
        services
            .AddCarService()
            .AddUserService()
            .AddAccountService();

        return services;
    }
}
