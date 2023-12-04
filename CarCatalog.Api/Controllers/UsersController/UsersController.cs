using AutoMapper;
using CarCatalog.Api.Controllers.UsersController.Models;
using CarCatalog.Bll.Services.UserService;
using CarCatalog.Bll.Services.UserService.Models;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.UsersController;

/// <summary>
///     Controller responsible for handling user-related actions.
/// </summary>
[ApiController]
[Route("api/users")]
[Authorize(Policy = AppRoles.Admin)]
public class UsersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserSevice _userSevice;

    /// <summary>
    ///     Initializes a new instance of the <see cref="UsersController"/> class.
    /// </summary>
    /// <param name="mapper">An instance of <see cref="IMapper"/> for object mapping.</param>
    /// <param name="userSevice">An instance of <see cref="IUserSevice"/> for user-related operations.</param>
    public UsersController(IMapper mapper, IUserSevice userSevice)
    {
        _mapper = mapper;
        _userSevice = userSevice;
    }

    /// <summary>
    ///     Retrieves information for a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to retrieve.</param>
    /// <returns>
    ///     If the user is found, returns an HTTP 200 OK response with user details.
    ///     If the user is not found, returns an HTTP 404 Not Found response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser([FromRoute] long id)
    {
        var userModel = await _userSevice.GetUserAsync(id);
        if (userModel == null)
            return NotFound();

        var response = _mapper.Map<UserResponse>(userModel);

        return Ok(response);
    }

    /// <summary>
    ///     Retrieves information for all users.
    /// </summary>
    /// <returns>
    ///     If the request is authorized, returns an HTTP 200 OK response with details of all users.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [HttpGet("")]
    public async Task<IEnumerable<UserResponse>> GetAllUsers()
    {
        var usersModel = await _userSevice.GetAllUsersAsync();

        var response = _mapper.Map<IEnumerable<UserResponse>>(usersModel);

        return response;
    }

    /// <summary>
    ///     Creates a new user based on the provided information.
    /// </summary>
    /// <param name="request">The <see cref="AddUserRequest"/> containing information for creating a new user.</param>
    /// <returns>
    ///     If the request is authorized and the user is successfully created, returns an HTTP 200 OK response.
    ///     If the request is authorized but user creation fails, returns an HTTP 400 Bad Request response with error details.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [HttpPost("")]
    public async Task<IActionResult> CreateUser([FromBody] AddUserRequest request)
    {
        var userModel = _mapper.Map<AddUserModel>(request);

        var responseModel = await _userSevice.AddUserAsync(userModel);
        if (!responseModel.IsError)
            return Ok();

        var response = _mapper.Map<UserErrorResponse>(responseModel);
        return BadRequest(response);
    }

    /// <summary>
    ///     Updates information for an existing user based on the provided data.
    /// </summary>
    /// <param name="id">The unique identifier of the user to update.</param>
    /// <param name="request">The <see cref="UpdateUserRequest"/> containing updated information for the user.</param>
    /// <returns>
    ///     If the request is authorized and the user is successfully updated, returns an HTTP 200 OK response.
    ///     If the request is authorized but the specified user is not found, returns an HTTP 404 Not Found response.
    ///     If the request is authorized but user update fails, returns an HTTP 400 Bad Request response with error details.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser([FromRoute] long id, [FromBody]  UpdateUserRequest request)
    {
        var userModel = _mapper.Map<UpdateUserModel>(request);

        var responseModel = await _userSevice.UpdateUserAsync(id, userModel);

        if (!responseModel.IsError)
            return Ok();

        if (responseModel.IsNotFoundError)
            return NotFound();

        var response = _mapper.Map<UserErrorResponse>(responseModel);
        return BadRequest(response);
    }

    /// <summary>
    ///     Deletes a user with the specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to delete.</param>
    /// <returns>
    ///     If the request is authorized and the user is successfully deleted, returns an HTTP 200 OK response.
    ///     If the request is authorized but the specified user is not found, returns an HTTP 404 Not Found response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] long id)
    {
        var hasDeleted = await _userSevice.DeleteUserAsync(id);
        if (!hasDeleted)
            return NotFound();

        return Ok();
    }
}
