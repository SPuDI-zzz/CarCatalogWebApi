using AutoMapper;
using CarCatalog.Bil.Services.AccountService.Models;

namespace CarCatalog.Api.Controllers.Account.Models;

/// <summary>
///     Represents a request to register a user account.
/// </summary>
public class RegisterUserAccountRequest
{
    /// <summary>
    ///     Gets or sets the desired username for the new user account.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string UserName { get; set; }

    /// <summary>
    ///     Gets or sets the desired password for the new user account.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Password { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="RegisterUserAccountRequest"/> entities to <see cref="RegisterUserAccountModel"/> objects.
/// </summary>
public class RegisterUserAccountRequestProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="RegisterUserAccountRequestProfile"/> class.
    /// </summary>
    public RegisterUserAccountRequestProfile()
    {
        CreateMap<RegisterUserAccountRequest, RegisterUserAccountModel>();
    }
}
