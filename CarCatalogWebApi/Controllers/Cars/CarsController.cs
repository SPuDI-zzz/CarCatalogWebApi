using AutoMapper;
using CarCatalog.Api.Controllers.Cars.Models;
using CarCatalog.Bil.Services.CarService;
using CarCatalog.Bil.Services.CarService.Models;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.Cars;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICarService _carService;

    public CarsController(IMapper mapper, ICarService carService)
    {
        _mapper = mapper;
        _carService = carService;
    }

    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarById([FromRoute]long id)
    {
        var carModel = await _carService.GetCarAsync(id);
        if (carModel is null)
            return NotFound();

        var response = _mapper.Map<CarResponse>(carModel);

        return Ok(response);
    }

    [Authorize(Policy = AppRoles.User)]
    [HttpGet("")]
    public async Task<IEnumerable<CarResponse>> GetAllCars()
    {
        var carsModel = await _carService.GetAllCarsAsync();

        var response = _mapper.Map<IEnumerable<CarResponse>>(carsModel);

        return response;
    }

    [Authorize(Policy = AppRoles.Manager)]
    [HttpPost("")]
    public async Task<IActionResult> CreateCar([FromBody] AddCarRequest request)
    {
        var model = _mapper.Map<AddCarModel>(request);

        await _carService.AddCarAsync(model);

        return Ok();
    }

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
