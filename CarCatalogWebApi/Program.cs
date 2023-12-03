using CarCatalog.Api;
using CarCatalog.Api.Middlewares;
using CarCatalog.Dal.Entities;
using CarCatalog.Dal.EntityFramework;
using CarCatalog.Dal.EntityFramework.Setup;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authentication.Cookies;
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

    services.AddControllers();

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddAppDbContext(configuration);

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
    });

    services.RegisterAppServices();

    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    var app = builder.Build();

    app.UseMiddleware<ExceptionsMiddleware>();
    app.UseMiddleware<RequestLogResourceMiddleware>();

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
    logger.Error(ex, "Stopped program because of exception");
}
finally
{
    LogManager.Shutdown();
}
