using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;
using CarCatalog.Shared.Enum;

namespace CarCatalog.Api.Controllers.UsersController.Models;

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

public class UpdateUserRequestProfile : Profile
{
    public UpdateUserRequestProfile()
    {
        CreateMap<UpdateUserRequest, UpdateUserModel>()
            .ForMember(dest => dest.Roles, opt =>
                opt.MapFrom(src => src.Roles.Select(role => role.ToString())));
    }
}
