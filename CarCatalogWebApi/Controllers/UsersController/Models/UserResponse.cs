using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;

namespace CarCatalog.Api.Controllers.UsersController.Models;

public class UserResponse
{
    public long Id { get; set; }

    /// <summary>
    ///     Gets or sets the login name for the user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Login { get; set; }

    /// <summary>
    ///     Gets or sets the roles assigned for the user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required IEnumerable<string> Roles { get; set; }
}

public class UserResponseProfile : Profile
{
    public UserResponseProfile()
    {
        CreateMap<UserModel, UserResponse>();
    }
}
