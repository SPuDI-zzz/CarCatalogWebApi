using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;
using CarCatalog.Shared.Enum;

namespace CarCatalog.Api.Controllers.UsersController.Models;

/// <summary>
///     Represents a request to update an existing user.
/// </summary>
public class UpdateUserRequest
{
    /// <summary>
    ///     Gets or sets the login of the user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Login { get; set; }

    /// <summary>
    ///     Gets or sets the roles assigned to the user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required IEnumerable<RolesEnum> Roles { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="UpdateUserRequest"/> entities to <see cref="UpdateUserModel"/> objects.
/// </summary>
public class UpdateUserRequestProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="UpdateUserRequestProfile"/> class.
    /// </summary>
    public UpdateUserRequestProfile()
    {
        CreateMap<UpdateUserRequest, UpdateUserModel>()
            .ForMember(dest => dest.Roles, opt =>
                opt.MapFrom(src => src.Roles.Select(role => role.ToString())));
    }
}
