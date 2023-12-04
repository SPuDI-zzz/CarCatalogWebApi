using AutoMapper;
using CarCatalog.Api.Controllers.Account.Models;
using CarCatalog.Bll.Services.AccountService;
using CarCatalog.Bll.Services.AccountService.Models;
using CarCatalog.Dal.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.Account;

/// <summary>
///     Controller responsible for handling account-related actions.
/// </summary
[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IAccountService _accountService;
    private readonly SignInManager<User> _signInManager;

    /// <summary>
    ///     Initializes a new instance of the <see cref="AccountController"/> class.
    /// </summary>
    /// <param name="mapper">An instance of <see cref="IMapper"/> for object mapping.</param>
    /// <param name="accountService">An instance of <see cref="IAccountService"/> for account-related operations.</param>
    /// <param name="signInManager">An instance of <see cref="SignInManager{TUser}"/> for managing user sign-in.</param>
    public AccountController(IMapper mapper, IAccountService accountService, SignInManager<User> signInManager)
    {
        _mapper = mapper;
        _accountService = accountService;
        _signInManager = signInManager;
    }

    /// <summary>
    ///     Registers a new user account.
    /// </summary>
    /// <param name="request">The <see cref="RegisterUserAccountRequest"/> containing registration information.</param>
    /// <returns>
    ///     If registration is successful, returns an HTTP 200 OK response.
    ///     If registration fails, returns an HTTP 400 Bad Request response with error details.
    /// </returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserAccountRequest request)
    {
        var userAccountModel = _mapper.Map<RegisterUserAccountModel>(request);

        var responseModel = await _accountService.RegisterAsync(userAccountModel);
        if (!responseModel.IsError)
            return Ok();

        var response = _mapper.Map<RegisterUserAccountErrorResponse>(responseModel);
        return BadRequest(response);
    }

    /// <summary>
    ///     Logs in a user with the provided credentials.
    /// </summary>
    /// <param name="request">The <see cref="LoginUserAccountRequest"/> containing login credentials.</param>
    /// <returns>
    ///     If login is successful, returns an HTTP 200 OK response.
    ///     If the user or password is invalid, returns an HTTP 401 Unauthorized response.
    /// </returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserAccountRequest request)
    {
        var user = await _signInManager.UserManager.FindByNameAsync(request.UserName);
        if (user is null)
            return Unauthorized();

        var resultSignIn = await _signInManager.PasswordSignInAsync(user, request.Password, true, false);
        if (!resultSignIn.Succeeded)
            return Unauthorized();

        return Ok();
    }

    /// <summary>
    ///     Logs out the currently authenticated user.
    /// </summary>
    /// <returns>An HTTP 200 OK response indicating successful logout.</returns>
    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }
}
