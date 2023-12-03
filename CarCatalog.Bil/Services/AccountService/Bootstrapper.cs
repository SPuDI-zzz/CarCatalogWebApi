using Microsoft.Extensions.DependencyInjection;

namespace CarCatalog.Bil.Services.AccountService;

/// <summary>
///     Static class responsible for bootstrapping and configuring services related to account-related operations.
/// </summary>
public static class Bootstrapper
{
    /// <summary>
    ///     Adds account-related services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to which account-related services will be added.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added account-related services.</returns>
    public static IServiceCollection AddAccountService(this IServiceCollection services)
    {
        services.AddScoped<IAccountService, AccountService>();

        return services;
    }
}
