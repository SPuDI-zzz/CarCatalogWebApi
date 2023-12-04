namespace CarCatalog.Api.Controllers.Account.Models;

/// <summary>
///     Represents a request to log in a user account.
/// </summary>
public class LoginUserAccountRequest
{
    /// <summary>
    ///     Gets or sets the username for the login.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string UserName { get; set; }

    /// <summary>
    ///     Gets or sets the password for the login.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Password { get; set; }
}
