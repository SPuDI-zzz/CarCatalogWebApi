using CarCatalog.Api;
using CarCatalog.Api.Configurations;
using CarCatalog.Api.Configurations.NotificationManager;
using CarCatalog.Dal.EntityFramework;
using CarCatalog.Dal.EntityFramework.Setup;
using NLog;
using NLog.Web;

var logger = LogManager
    .Setup()
    .LoadConfigurationFromAppSettings()
    .GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    var services = builder.Services;
    var configuration = builder.Configuration;

    services.AddWebSocketManager();

    services.AddControllers();

    services.AddAppSwagger();

    services.AddAppDbContext(configuration);

    services.AddAppAuth();

    services.RegisterAppServices();

    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    var app = builder.Build();

    app.UseAppWebSockets();

    app.UseCors(policy => policy.WithOrigins("http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials());

    app.UseAppMiddlewares();

    app.UseAppSwagger();

    app.UseAppAuth();

    app.MapControllers();

    await DbInitializer.Execute(app.Services);
    DbSeeder.Execute(app.Services, true, true);

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Stopped program because of exception");
}
finally
{
    LogManager.Shutdown();
}
