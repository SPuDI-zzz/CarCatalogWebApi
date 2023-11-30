namespace CarCatalog.Dal;

/// <summary>
///     Represents settings related to the database connection.
/// </summary>
public class DbSettings
{
    /// <summary>
    ///     Gets or sets the connection string for the database.
    /// </summary>
    public string DefaultConnection { get; set; } = string.Empty;
}
