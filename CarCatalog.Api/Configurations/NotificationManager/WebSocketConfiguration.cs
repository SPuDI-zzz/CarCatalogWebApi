using CarCatalog.Bll.Services.NotificationManager;

namespace CarCatalog.Api.Configurations.NotificationManager;

/// <summary>
///     Provides extension methods for configuring WebSocket-related services and middleware.
/// </summary>
public static class WebSocketConfiguration
{
    /// <summary>
    ///     Adds WebSocket-related services to the service collection.
    /// </summary>
    /// <param name="services">The service collection to which WebSocket services are added.</param>
    /// <returns>The modified service collection.</returns>
    public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
    {
        services.AddTransient<INotificationConnectionManager, NotificationConnectionManager>();
        services.AddSingleton<NotificationsWebSocketHandler>();
        services.AddSingleton<NotificationTask>();

        return services;
    }

    /// <summary>
    ///     Configures the application to use WebSocket middleware.
    /// </summary>
    /// <param name="app">The application builder to which WebSocket middleware is added.</param>
    /// <returns>The modified application builder.</returns>
    public static IApplicationBuilder UseAppWebSockets(this IApplicationBuilder app)
    {
        var webSocketOptions = new WebSocketOptions()
        {
            KeepAliveInterval = TimeSpan.FromMinutes(2),
        };

        webSocketOptions.AllowedOrigins.Add("http://127.0.0.1:5500");

        app.UseWebSockets(webSocketOptions);

        return app;
    }
}
