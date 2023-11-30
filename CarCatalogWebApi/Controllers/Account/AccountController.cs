using AutoMapper;
using CarCatalog.Api.Controllers.Account.Models;
using CarCatalog.Bil.Services.AccountService;
using CarCatalog.Bil.Services.AccountService.Models;
using CarCatalog.Dal.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.Account;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IAccountService _accountService;
    private readonly SignInManager<User> _signInManager;

    public AccountController(IMapper mapper, IAccountService accountService, SignInManager<User> signInManager)
    {
        _mapper = mapper;
        _accountService = accountService;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserAccountRequest request)
    {
        var userAccountModel = _mapper.Map<RegisterUserAccountModel>(request);

        var responseModel = await _accountService.RegisterAsync(userAccountModel);
        if (!responseModel.IsError)
            Ok();

        var response = _mapper.Map<RegisterUserAccountErrorResponse>(responseModel);
        return BadRequest(response);
    }

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

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }
}
