using AutoMapper;
using CarCatalog.Bil.Services.AccountService.Models;
using CarCatalog.Dal.Entities;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Identity;

namespace CarCatalog.Bil.Services.AccountService;

/// <summary>
///     Service for user authentication
/// </summary>
public class AccountService : IAccountService
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    /// <summary>
    ///     Initializes a new instance of the <see cref="AccountService" /> class.
    /// </summary>
    /// <param name="userManager">The user manager for register </param>
    /// <param name="mapper">To mapping an object of one type to another</param>
    public AccountService(
        UserManager<User> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    /// <inheritdoc />
    public async Task<RegisterUserAccountResponseModel> RegisterAsync(RegisterUserAccountModel model)
    {
        var user = _mapper.Map<User>(model);

        var resultCreateUser = await _userManager.CreateAsync(user, model.Password);
        if (!resultCreateUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultCreateUser.Errors
            };

        var resultAddRoleToUser =  await _userManager.AddToRoleAsync(user, AppRoles.User);
        if (!resultAddRoleToUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultAddRoleToUser.Errors
            };

        return new();
    }
}
