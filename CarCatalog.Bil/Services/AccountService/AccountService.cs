﻿using AutoMapper;
using CarCatalog.Bil.Services.AccountService.Models;
using CarCatalog.Dal.Entities;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarCatalog.Bil.Services.AccountService;

/// <summary>
///     Service for user authentication
/// </summary>
public class AccountService : IAccountService
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    /// <summary>
    ///     Initializes a new instance of the <see cref="AccountService" /> class.
    /// </summary>
    /// <param name="userManager">The user manager for register </param>
    /// <param name="configuration">For configuring</param>
    /// <param name="mapper">To mapping an object of one type to another</param>
    public AccountService(
        UserManager<User> userManager,
        IConfiguration configuration,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
        _configuration = configuration;
    }

    /// <inheritdoc />
    public async Task<RegisterUserAccountResponseModel> RegisterAsync(RegisterUserAccountModel model)
    {
        var user = _mapper.Map<User>(model);

        var resultCreateUser = await _userManager.CreateAsync(user, model.Password);
        if (!resultCreateUser.Succeeded)
            return new RegisterUserAccountResponseModel
            {
                IsError = true,
                ErrorMessages = resultCreateUser.Errors
            };

        var resultAddRoleToUser =  await _userManager.AddToRoleAsync(user, AppRoles.User);
        if (!resultAddRoleToUser.Succeeded)
            return new RegisterUserAccountResponseModel
            {
                IsError = true,
                ErrorMessages = resultAddRoleToUser.Errors
            };

        return new();
    }

    /// <inheritdoc />
    public async Task<LoginUserAccountResponseModel> LoginAsync(LoginUserAccountModel model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);
        if (user == null)
            return new LoginUserAccountResponseModel
            {
                IsError = true,
            };
        //var a = await
        var checkPassword = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!checkPassword)
            return new LoginUserAccountResponseModel
            {
                IsError = true,
            };

        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new(ClaimTypes.Role, userRole));
        }

        var token = GetToken(authClaims);
        return new LoginUserAccountResponseModel
        {
            IsError = false,
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        }; 
    }

    /// <summary>
    ///     Generates a JWT (JSON Web Token) with the specified authentication claims.
    /// </summary>
    /// <param name="authClaims">
    ///     A list of <see cref="Claim"/> objects representing the user's authentication claims.
    /// </param>
    /// <returns>
    ///     A <see cref="JwtSecurityToken"/> representing the generated JWT with the provided
    ///     authentication claims.
    /// </returns>
    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

        return token;
    }
}
