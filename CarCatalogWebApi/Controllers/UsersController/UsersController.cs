using AutoMapper;
using CarCatalog.Api.Controllers.Cars.Models;
using CarCatalog.Api.Controllers.UsersController.Models;
using CarCatalog.Bil.Services.UserService;
using CarCatalog.Bil.Services.UserService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.UsersController;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserSevice _userSevice;

    public UsersController(IMapper mapper, IUserSevice userSevice)
    {
        _mapper = mapper;
        _userSevice = userSevice;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser([FromRoute] long id)
    {
        var userModel = await _userSevice.GetUserAsync(id);
        if (userModel == null)
            return NotFound();

        var response = _mapper.Map<UserResponse>(userModel);

        return Ok(response);
    }

    [HttpGet("")]
    public async Task<IEnumerable<UserResponse>> GetAllUsers()
    {
        var usersModel = await _userSevice.GetAllUsersAsync();

        var response = _mapper.Map<IEnumerable<UserResponse>>(usersModel);

        return response;
    }

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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] long id)
    {
        var hasDeleted = await _userSevice.DeleteUserAsync(id);
        if (!hasDeleted)
            return NotFound();

        return Ok();
    }
}
