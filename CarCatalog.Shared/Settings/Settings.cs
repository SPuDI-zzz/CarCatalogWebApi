namespace CarCatalog.Shared.Settings;

using Microsoft.Extensions.Configuration;

/// <summary>
///     Abstract base class for loading application settings.
/// </summary>
public abstract class Settings
{
    /// <summary>
    ///     Loads application settings of type <typeparamref name="T"/> from the specified configuration section key.
    /// </summary>
    /// <typeparam name="T">The type of settings to load.</typeparam>
    /// <param name="key">The key of the configuration section containing the settings.</param>
    /// <param name="configuration">Optional configuration object; if provided, it is used to load settings.</param>
    /// <returns>An instance of settings loaded from the specified configuration section.</returns>
    public static T Load<T>(string key, IConfiguration? configuration = null)
    {
        var settings = (T)Activator.CreateInstance(typeof(T))!;

        SettingsFactory.Create(configuration).GetSection(key).Bind(settings, (x) => { x.BindNonPublicProperties = true; });

        return settings;
    }
}
