using CarCatalog.Api;
using CarCatalog.Api.Configurations;
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

    services.AddControllers();

    services.AddAppSwagger();

    services.AddAppDbContext(configuration);

    services.AddAppAuth();

    services.RegisterAppServices();

    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    var app = builder.Build();

    app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

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
