using AutoMapper;
using CarCatalog.Api.Controllers.Cars.Models;
using CarCatalog.Bil.Services.CarService;
using CarCatalog.Bil.Services.CarService.Models;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.Cars;

/// <summary>
///     Controller responsible for handling car-related actions.
/// </summary>
[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICarService _carService;

    /// <summary>
    ///     Initializes a new instance of the <see cref="CarsController"/> class.
    /// </summary>
    /// <param name="mapper">An instance of <see cref="IMapper"/> for object mapping.</param>
    /// <param name="carService">An instance of <see cref="ICarService"/> for car-related operations.</param>
    public CarsController(IMapper mapper, ICarService carService)
    {
        _mapper = mapper;
        _carService = carService;
    }

    /// <summary>
    ///     Retrieves car information by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the car.</param>
    /// <returns>
    ///     If the car is found, returns an HTTP 200 OK response with car details.
    ///     If the car is not found, returns an HTTP 404 Not Found response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    /// </returns>
    [Authorize(Policy = AppRoles.User)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarById([FromRoute]long id)
    {
        var carModel = await _carService.GetCarAsync(id);
        if (carModel is null)
            return NotFound();

        var response = _mapper.Map<CarResponse>(carModel);

        return Ok(response);
    }

    /// <summary>
    ///     Retrieves information for all cars.
    /// </summary>
    /// <returns>
    ///     If the request is authorized, returns an HTTP 200 OK response with details of all cars.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    /// </returns>
    [Authorize(Policy = AppRoles.User)]
    [HttpGet("")]
    public async Task<IEnumerable<CarResponse>> GetAllCars()
    {
        var carsModel = await _carService.GetAllCarsAsync();

        var response = _mapper.Map<IEnumerable<CarResponse>>(carsModel);

        return response;
    }

    /// <summary>
    ///     Creates a new car based on the provided information.
    /// </summary>
    /// <param name="request">The <see cref="AddCarRequest"/> containing information for creating a new car.</param>
    /// <returns>
    ///     If the request is authorized, returns an HTTP 200 OK response indicating successful car creation.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.Manager)]
    [HttpPost("")]
    public async Task<IActionResult> CreateCar([FromBody] AddCarRequest request)
    {
        var carModel = _mapper.Map<AddCarModel>(request);

        await _carService.AddCarAsync(carModel);

        return Ok();
    }

    /// <summary>
    ///     Updates information for an existing car based on the provided data.
    /// </summary>
    /// <param name="id">The unique identifier of the car to update.</param>
    /// <param name="request">The <see cref="UpdateCarRequest"/> containing updated information for the car.</param>
    /// <returns>
    ///     If the request is authorized and the car is successfully updated, returns an HTTP 200 OK response.
    ///     If the request is authorized but the specified car is not found, returns an HTTP 404 Not Found response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.Manager)]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCar([FromRoute] long id, [FromBody] UpdateCarRequest request)
    {
        var carModel = _mapper.Map<UpdateCarModel>(request);

        var hasEdited = await _carService.UpdateCarAsync(id, carModel);
        if (!hasEdited)
            return NotFound();

        return Ok();
    }

    /// <summary>
    ///     Deletes a car with the specified unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the car to delete.</param>
    /// <returns>
    ///     If the request is authorized and the car is successfully deleted, returns an HTTP 200 OK response.
    ///     If the request is authorized but the specified car is not found, returns an HTTP 404 Not Found response.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.Manager)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar([FromRoute] long id)
    {
        var hasDeleted = await _carService.DeleteCarAsync(id);
        if (!hasDeleted)
            return NotFound();

        return Ok();
    }
}
