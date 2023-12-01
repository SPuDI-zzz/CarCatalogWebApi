using CarCatalog.Bil.Services.AccountService.Models;

namespace CarCatalog.Bil.Services.AccountService;

/// <summary>
///     Defines the contract for a service responsible for user account management operations.
/// </summary>
public interface IAccountService
{
    /// <summary>
    ///     Asynchronously registers a new user account based on the provided information.
    /// </summary>
    /// <param name="model">
    ///     A <see cref="RegisterUserAccountModel"/> containing the user's registration details.
    /// </param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation. A response model indicating the success or failure of the registration operation.
    /// </returns>
    Task<RegisterUserAccountResponseModel> RegisterAsync(RegisterUserAccountModel model);
}
