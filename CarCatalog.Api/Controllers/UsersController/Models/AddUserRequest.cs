using AutoMapper;
using CarCatalog.Bll.Services.UserService.Models;

namespace CarCatalog.Api.Controllers.UsersController.Models;

/// <summary>
///     Represents a request to add a new user.
/// </summary>
public class AddUserRequest
{
    /// <summary>
    /// Gets or sets the login name for the new user.
    /// </summary>
    /// <remarks>This property is required.</remarks>
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
    public required IEnumerable<string> Roles { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="AddUserRequest"/> entities to <see cref="AddUserModel"/> objects.
/// </summary>
public class AddUserRequestProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="AddUserRequestProfile"/> class.
    /// </summary>
    public AddUserRequestProfile()
    {
        CreateMap<AddUserRequest, AddUserModel>();
    }
}
