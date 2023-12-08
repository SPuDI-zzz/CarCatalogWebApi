using CarCatalog.Dal.Entities;
using CarCatalog.Dal.EntityFramework;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace CarCatalog.Api.Configurations;

/// <summary>
///     Helper class for configuring and using application authentication.
/// </summary>
public static class AuthConfiguration
{
    /// <summary>
    ///     Adds application authentication services to the specified <see cref="IServiceCollection"/>.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to add authentication services to.</param>
    /// <returns>The modified <see cref="IServiceCollection"/> with added authentication services.</returns>
    public static IServiceCollection AddAppAuth(this IServiceCollection services)
    {
        services.AddIdentity<User, UserRole>()
            .AddEntityFrameworkStores<MainDbContext>();

        services.AddAuthentication();

        services.AddAuthorization(options =>
        {
            options.AddPolicy(AppRoles.User, policy => policy
                .RequireAuthenticatedUser()
                .RequireRole(AppRoles.User, AppRoles.Manager, AppRoles.Admin));

            options.AddPolicy(AppRoles.Manager, policy => policy
                .RequireAuthenticatedUser()
                .RequireRole(AppRoles.Manager, AppRoles.Admin));

            options.AddPolicy(AppRoles.Admin, policy => policy
                .RequireAuthenticatedUser()
                .RequireRole(AppRoles.Admin));
        });

        services.ConfigureApplicationCookie(options =>
        {
            options.Events = new CookieAuthenticationEvents()
            {
                OnRedirectToLogin = (context) =>
                {
                    if (context.Request.Path.StartsWithSegments("/api"))
                    {
                        context.Response.StatusCode = 401;
                    }

                    return Task.CompletedTask;
                },
                OnRedirectToAccessDenied = (context) =>
                {
                    if (context.Request.Path.StartsWithSegments("/api"))
                    {
                        context.Response.StatusCode = 403;
                    }

                    return Task.CompletedTask;
                }
            };
            options.Cookie.SameSite = SameSiteMode.None;
        });

        return services;
    }

    /// <summary>
    /// Configures the application to use the added authentication services.
    /// </summary>
    /// <param name="app">The <see cref="IApplicationBuilder"/> to configure for using authentication.</param>
    /// <returns>The modified <see cref="IApplicationBuilder"/> configured for using authentication.</returns>
    public static IApplicationBuilder UseAppAuth(this IApplicationBuilder app)
    {
        app.UseCookiePolicy(
            new CookiePolicyOptions
            {
                Secure = CookieSecurePolicy.Always
            });

        app.UseAuthentication();

        app.UseAuthorization();

        return app;
    }
}
