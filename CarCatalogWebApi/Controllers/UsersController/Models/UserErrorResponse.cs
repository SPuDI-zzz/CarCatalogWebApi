using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;
using Microsoft.AspNetCore.Identity;

namespace CarCatalog.Api.Controllers.UsersController.Models;

/// <summary>
///     Represents an error response when attempting to perform user-related operations.
/// </summary>
public class UserErrorResponse
{
    /// <summary>
    ///     Gets or sets a collection of <see cref="IdentityError"/> representing errors that occurred.
    /// </summary>
    public IEnumerable<IdentityError>? Errors { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="AddUserResponseModel"/> entities to <see cref="UserErrorResponse"/>
///     and <see cref="UpdateUserResponseModel"/> entities to <see cref="UserErrorResponse"/> classes.
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
