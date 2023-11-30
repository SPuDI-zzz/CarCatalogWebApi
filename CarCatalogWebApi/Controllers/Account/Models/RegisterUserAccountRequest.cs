using AutoMapper;
using CarCatalog.Bil.Services.AccountService.Models;

namespace CarCatalog.Api.Controllers.Account.Models;

public class RegisterUserAccountRequest
{
    public required string UserName { get; set; }

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
