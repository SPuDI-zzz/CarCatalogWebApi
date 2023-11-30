using AutoMapper;
using CarCatalog.Bil.Services.AccountService.Models;
using Microsoft.AspNetCore.Identity;

namespace CarCatalog.Api.Controllers.Account.Models;

public class RegisterUserAccountErrorResponse
{
    public IEnumerable<IdentityError>? Errors { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="RegisterUserAccountResponseModel"/> entities to <see cref="RegisterUserAccountErrorResponse"/> objects.
/// </summary>
public class RegisterUserAccountErrorResponseProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="RegisterUserAccountErrorResponseProfile"/> class.
    /// </summary>
    public RegisterUserAccountErrorResponseProfile()
    {
        CreateMap<RegisterUserAccountResponseModel, RegisterUserAccountErrorResponse>()
            .ForMember(dest => dest.Errors, opt => opt.MapFrom(src => src.ErrorMessages));
    }
}
