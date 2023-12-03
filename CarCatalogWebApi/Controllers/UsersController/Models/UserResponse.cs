using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;

namespace CarCatalog.Api.Controllers.UsersController.Models;

/// <summary>
///     Represents a response containing information about a user.
/// </summary>
public class UserResponse
{
    /// <summary>
    ///     Gets or sets the unique identifier of the user.
    /// </summary>
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

/// <summary>
///     AutoMapper profile for mapping <see cref="UserModel"/> entities to <see cref="UserResponse"/> objects.
/// </summary>
public class UserResponseProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="UserResponseProfile"/> class.
    /// </summary>
    public UserResponseProfile()
    {
        CreateMap<UserModel, UserResponse>();
    }
}
