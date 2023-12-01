using AutoMapper;
using CarCatalog.Api.Controllers.Account.Models;
using CarCatalog.Bil.Services.AccountService.Models;
using CarCatalog.Bil.Services.UserService.Models;
using Microsoft.AspNetCore.Identity;

namespace CarCatalog.Api.Controllers.UsersController.Models;

public class UserErrorResponse
{
    public IEnumerable<IdentityError>? Errors { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="RegisterUserAccountResponseModel"/> entities to <see cref="RegisterUserAccountErrorResponse"/> objects.
/// </summary>
public class UserErrorResponseProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="UserErrorResponseProfile"/> class.
    /// </summary>
    public UserErrorResponseProfile()
    {
        CreateMap<AddUserResponseModel, UserErrorResponse>()
            .ForMember(dest => dest.Errors, opt => opt.MapFrom(src => src.ErrorMessages));
        CreateMap<UpdateUserResponseModel, UserErrorResponse>()
            .ForMember(dest => dest.Errors, opt => opt.MapFrom(src => src.ErrorMessages));
    }
}
