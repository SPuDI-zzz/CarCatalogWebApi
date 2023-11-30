using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Bil.Services.UserService;

public static class Bootstrapper
{
    public static IServiceCollection AddUserService(this IServiceCollection services)
    {
        services.AddScoped<IUserSevice, UserService>();

        return services;
    }
}
