using CarCatalog.Api.Middlewares;

namespace CarCatalog.Api.Configurations;

/// <summary>
///     Helper class for configuring and using application middlewares.
/// </summary>
public static class MiddlewaresConfiguration
{
    /// <summary>
    ///     Configures the application to use custom middlewares.
    /// </summary>
    /// <param name="app">The <see cref="IApplicationBuilder"/> to configure for using middlewares.</param>
    public static void UseAppMiddlewares(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionsMiddleware>();
        app.UseMiddleware<RequestLogResourceMiddleware>();
    }
}
