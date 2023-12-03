namespace CarCatalog.Api.Configurations;

/// <summary>
///     Helper class for configuring and using Swagger documentation.
/// </summary>
public static class SwaggerConfiguration
{
    /// <summary>
    ///     Adds Swagger services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to add Swagger services to.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added Swagger services.</returns>
    public static IServiceCollection AddAppSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen();

        return services;
    }

    /// <summary>
    ///     Configures the application to use Swagger for API documentation.
    /// </summary>
    /// <param name="app">The <see cref="IApplicationBuilder"/> to configure for using Swagger.</param>
    public static void UseAppSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger();

        app.UseSwaggerUI();
    }
}
