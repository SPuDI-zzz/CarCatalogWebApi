using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Bll.Services.UserService;

/// <summary>
///     Static class responsible for bootstrapping and configuring services related to user-related operations.
/// </summary>
public static class Bootstrapper
{
    /// <summary>
    ///     Adds user-related services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to which user-related services will be added.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added user-related services.</returns>
    public static IServiceCollection AddUserService(this IServiceCollection services)
    {
        services.AddScoped<IUserSevice, UserService>();

        return services;
    }
}
