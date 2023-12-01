using CarCatalog.Api;
using CarCatalog.Api.Filters;
using CarCatalog.Dal.Entities;
using CarCatalog.Dal.EntityFramework;
using CarCatalog.Dal.EntityFramework.Setup;
using CarCatalog.Shared.Const;
using NLog;
using NLog.Web;

var logger = LogManager
    .Setup()
    .LoadConfigurationFromAppSettings()
    .GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);
    var services = builder.Services;
    var configuration = builder.Configuration;

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    services.AddControllers(options => 
    {
        options.Filters.Add<RequestLogResourceFilter>();
    });

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddAppDbContext(configuration);

    services.AddIdentity<User, UserRole>()
        .AddEntityFrameworkStores<MainDbContext>();

    services.AddAuthentication();

    services.AddAuthorization(options =>
    {
        options.AddPolicy(AppRoles.User, policy => policy
            .RequireRole(AppRoles.User, AppRoles.Manager, AppRoles.Admin));

        options.AddPolicy(AppRoles.Manager, policy => policy
            .RequireRole(AppRoles.Manager, AppRoles.Admin));

        options.AddPolicy(AppRoles.Admin, policy => policy
            .RequireRole(AppRoles.Admin));
    });

    services.RegisterAppServices();

    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    DbInitializer.Execute(app.Services);
    DbSeeder.Execute(app.Services, true, true);

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex);
}
finally
{
    LogManager.Shutdown();
}
