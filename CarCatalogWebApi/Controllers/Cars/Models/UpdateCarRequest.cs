using AutoMapper;
using CarCatalog.Bil.Services.CarService.Models;

namespace CarCatalog.Api.Controllers.Cars.Models;

public class UpdateCarRequest
{
    /// <summary>
    ///     Gets or sets the mark name of the car.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Mark { get; set; }

    /// <summary>
    ///     Gets or sets the model name of the car.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Model { get; set; }

    /// <summary>
    ///     Gets or sets the color of the car.
    /// </summary>
    /// <remarks>This property is required.</remarks>
    public required string Color { get; set; }

    /// <summary>
    ///     Gets or sets the unique identifier for the user associated with the car.
    /// </summary>
    public long UserId { get; set; }
}

/// <summary>
///     AutoMapper profile for mapping <see cref="UpdateCarRequest"/> entities to <see cref="UpdateCarModel"/> objects.
/// </summary>
public class UpdateCarRequestProfile : Profile
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="UpdateCarRequestProfile"/> class.
    /// </summary>
    public UpdateCarRequestProfile()
    {
        CreateMap<UpdateCarRequest, UpdateCarModel>();
    }
}
