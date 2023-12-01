using Microsoft.AspNetCore.Identity;

namespace CarCatalog.Bil.Services.UserService.Models;

/// <summary>
///     Represents the response model for adding a user account.
/// </summary>
public class AddUserResponseModel
{
    /// <summary>
    ///     Gets or sets a value indicating whether the user account addition operation resulted in an error.
    /// </summary>
    public bool IsError { get; set; }

    /// <summary>
    ///     Gets or sets an error message providing details about the user account addition failure, if applicable.
    /// </summary>
    public IEnumerable<IdentityError>? ErrorMessages { get; set; }
}
