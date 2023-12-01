using AutoMapper;
using CarCatalog.Bil.Services.UserService.Models;
using CarCatalog.Dal.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace CarCatalog.Bil.Services.UserService;

/// <summary>
///     Provides functionality for managing user-related operations.
/// </summary>
public class UserService : IUserSevice
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    /// <summary>
    ///     Initializes a new instance of the <see cref="UserService"/> class.
    /// </summary>
    /// <param name="mapper">An <see cref="IMapper"/> instance for object mapping.</param>
    /// <param name="userManager">A <see cref="UserManager{TUser}"/> instance for managing user-related operations.</param>
    public UserService(IMapper mapper, UserManager<User> userManager)
    {
        _mapper = mapper;
        _userManager = userManager;
    }

    /// <inheritdoc/>
    public async Task<AddUserResponseModel> AddUserAsync(AddUserModel model)
    {
        var user = _mapper.Map<User>(model);

        using var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var resultCreateUser = await _userManager.CreateAsync(user, model.Password);
        if (!resultCreateUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultCreateUser.Errors
            };

        var resultAddRolesToUser = await _userManager.AddToRolesAsync(user, model.Roles);
        if (!resultAddRolesToUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultAddRolesToUser.Errors
            };
        
        transactionScope.Complete();
        return new();       
    }

    /// <inheritdoc/>
    public async Task<bool> DeleteUserAsync(long userId)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Id.Equals(userId));
        if (user == null)
            return false;

        var result =  await _userManager.DeleteAsync(user);
        if (!result.Succeeded)
            return false;

        return true;
    }

    /// <inheritdoc/>
    public async Task<UserModel?> GetUserAsync(long userId)
    {
        var data = await _userManager.Users
            .Include(user => user.UserRoles)
                .ThenInclude(userRoles => userRoles.Role)
            .Select(user => new UserModel
            {
                Id = user.Id,
                Login = user.UserName!,
                Roles = user.UserRoles!.Select(userRoles => userRoles.Role.Name)!
            })
            .FirstOrDefaultAsync(user => user.Id.Equals(userId));

        return data;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        var data = await _userManager.Users
            .Include(user => user.UserRoles)
                .ThenInclude(userRoles => userRoles.Role)
            .Select(user => new UserModel
            {
                Id = user.Id,
                Login = user.UserName!,
                Roles = user.UserRoles!.Select(userRoles => userRoles.Role.Name)!
            })
            .ToListAsync();

        return data;
    }

    /// <inheritdoc/>
    public async Task<UpdateUserResponseModel> UpdateUserAsync(long userId, UpdateUserModel model)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Id.Equals(userId));
        if (user == null)
            return new()
            {
                IsError = true,
                IsNotFoundError = true
            };

        user = _mapper.Map(model, user);

        using var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

        var resultUpdateUser = await _userManager.UpdateAsync(user);
        if (!resultUpdateUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultUpdateUser.Errors
            };

        var roles = await _userManager.GetRolesAsync(user);

        if (roles.SequenceEqual(model.Roles))
        {
            transactionScope.Complete();
            return new();
        }

        var resultRevoveRoleFromUser = await _userManager.RemoveFromRolesAsync(user, roles);
        if (!resultRevoveRoleFromUser.Succeeded)
            return new()
            {
                IsError = true,
                ErrorMessages = resultRevoveRoleFromUser.Errors
            };

        var resultAddRoleToUser = await _userManager.AddToRolesAsync(user, model.Roles);
        if (!resultAddRoleToUser.Succeeded)
            return new() 
            {
                IsError = true,
                ErrorMessages = resultAddRoleToUser.Errors
            };

        transactionScope.Complete();
        return new();
    }
}
