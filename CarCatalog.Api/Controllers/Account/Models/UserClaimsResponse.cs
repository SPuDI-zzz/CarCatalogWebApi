namespace CarCatalog.Api.Controllers.Account.Models;

/// <summary>
///     Represents the response containing user claims information.
/// </summary>
public class UserClaimsResponse
{
    /// <summary>
    ///     Gets or sets the user ID.
    /// </summary>
    public long UserId { get; set; }

    /// <summary>
    ///     Gets or sets the roles assigned to the user.
    /// </summary>
    public IEnumerable<string> UserRoles { get; set; } = new List<string>();
}
