using System.Security.Claims;

namespace CarCatalog.Api.Extensions;

/// <summary>
///     Provides extension methods for working with claims associated with a <see cref="ClaimsPrincipal"/> instance.
/// </summary>
public static class ClaimsPrincipalExtensions
{
    /// <summary>
    ///     Gets the user's unique identifier from the claims.
    /// </summary>
    /// <param name="user">The <see cref="ClaimsPrincipal"/> representing the user.</param>
    /// <returns>
    ///     The unique identifier of the user if found; otherwise, the default value for <see cref="long"/>.
    /// </returns>
    public static long GetUserId(this ClaimsPrincipal user)
    {
        var nameIdentifier = user.FindFirstValue(ClaimTypes.NameIdentifier);
        _ = long.TryParse(nameIdentifier, out var userId);
        return userId;
    }

    /// <summary>
    ///     Retrieves the roles associated with a user from the claims principal.
    /// </summary>
    /// <param name="user">The <see cref="ClaimsPrincipal"/> representing the user.</param>
    /// <returns>
    ///     An enumerable collection of strings representing the roles assigned to the user.
    /// </returns>
    public static IEnumerable<string> GetRoles(this ClaimsPrincipal user)
    {
        var userRoles = user
            .FindAll(ClaimsIdentity.DefaultRoleClaimType)
            .Select(claim => claim.Value);

        return userRoles;
    }
}
