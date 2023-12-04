﻿using CarCatalog.Dal.Entities;
using CarCatalog.Dal.EntityFramework;
using CarCatalog.Dal.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CarCatalog.Dal.Repositories.CarRepository;

/// <summary>
///     Represents a repository for performing CRUD operations on entities of type <see cref="Car"/>.
/// </summary>
/// <remarks>
///     The <see cref="CarRepository"/> class implements the <see cref="IRepository{T}"/> interface
/// </remarks>
public class CarRepository : IRepository<Car>
{
    private readonly IDbContextFactory<MainDbContext> _dbContextFactory;

    /// <summary>
    ///     Initializes a new instance of the <see cref="CarRepository"/> class with the specified
    ///     <see cref="IDbContextFactory{TContext}"/> for creating instances of the database context.
    /// </summary>
    /// <param name="dbContextFactory">The factory for creating instances of the database context.</param>
    public CarRepository(IDbContextFactory<MainDbContext> dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    /// <inheritdoc />
    public async Task CreateAsync(Car item)
    {
        using var context = await _dbContextFactory.CreateDbContextAsync();

        await context.Cars.AddAsync(item);
        await context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<bool> DeleteAsync(long id)
    {
        using var context = await _dbContextFactory.CreateDbContextAsync();

        var car = await context.Cars.FirstOrDefaultAsync(car => car.Id.Equals(id));

        if (car == null)
            return false;

        context.Cars.Remove(car);
        await context.SaveChangesAsync();
        return true;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<Car>> GetAllAsync()
    {
        using var context = await _dbContextFactory.CreateDbContextAsync();

        var cars = await context.Cars.ToListAsync();
        return cars;
    }

    /// <inheritdoc />
    public async Task<Car?> GetAsync(long id)
    {
        using var context = await _dbContextFactory.CreateDbContextAsync();

        var car = await context.Cars.FirstOrDefaultAsync(car => car.Id.Equals(id));
        return car;
    }

    /// <inheritdoc />
    public async Task UpdateAsync(Car item)
    {
        using var context = await _dbContextFactory.CreateDbContextAsync();

        context.Cars.Update(item);
        await context.SaveChangesAsync();
    }
}
