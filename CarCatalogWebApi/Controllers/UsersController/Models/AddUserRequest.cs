using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;
using CarCatalog.Shared.Enum;

namespace CarCatalog.Api.Controllers.UsersController.Models;

public class AddUserRequest
{
    public required string Login { get; set; }

    /// <summary>
    ///     Gets or sets the password for the new user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Password { get; set; }

    /// <summary>
    ///     Gets or sets the roles assigned for the new user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required IEnumerable<RolesEnum> Roles { get; set; }
}

public class AddUserRequestProfile : Profile
{
    public AddUserRequestProfile()
    {
        CreateMap<AddUserRequest, AddUserModel>()
            .ForMember(dest => dest.Roles, opt => 
                opt.MapFrom(src => src.Roles.Select(role => role.ToString())));
    }
}
