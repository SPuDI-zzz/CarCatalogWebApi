namespace CarCatalog.Shared.Settings;

using Microsoft.Extensions.Configuration;

/// <summary>
///     A static class responsible for creating an <see cref="IConfiguration"/> instance for loading application settings.
/// </summary>
public static class SettingsFactory
{
    /// <summary>
    ///     Creates an <see cref="IConfiguration"/> instance for loading application settings.
    /// </summary>
    /// <param name="configuration">Optional existing configuration; if provided, it is used, otherwise a new configuration is created.</param>
    /// <returns>An <see cref="IConfiguration"/> instance for accessing application settings.</returns>
    public static IConfiguration Create(IConfiguration? configuration = null)
    {
        var conf = configuration ?? new ConfigurationBuilder()
                                        .SetBasePath(Directory.GetCurrentDirectory())
                                        .AddJsonFile("appsettings.json", optional: false)
                                        .AddEnvironmentVariables()
                                        .Build();

        return conf;
    }
}
