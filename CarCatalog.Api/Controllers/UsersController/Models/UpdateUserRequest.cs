using AutoMapper;
using CarCatalog.Bll.Services.UserService.Models;

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
    public required IEnumerable<string> Roles { get; set; }
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
        CreateMap<UpdateUserRequest, UpdateUserModel>();
    }
}
