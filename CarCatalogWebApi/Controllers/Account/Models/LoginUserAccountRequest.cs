using AutoMapper;

namespace CarCatalog.Api.Controllers.Account.Models;

public class LoginUserAccountRequest
{
    public required string UserName { get; set; }

    public required string Password { get; set; }
}
