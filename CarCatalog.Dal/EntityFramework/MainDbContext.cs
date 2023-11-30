﻿using CarCatalog.Dal.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarCatalog.Dal.EntityFramework;

/// <summary>
///     Represents the main database context for the application, extending IdentityDbContext for user and role management.
/// </summary>
public class MainDbContext : IdentityDbContext<User, UserRole, long, IdentityUserClaim<long>, UserRoleOwners, IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
{
    /// <summary>
    ///     Gets or sets the DbSet for interacting with the <seealso cref="Car"/> entity in the database.
    /// </summary>
    public DbSet<Car> Cars { get; set; }
    /// <summary>
    /// Initializes a new instance of the MainDbContext class with the specified options.
    /// </summary>
    /// <param name="options">The options to be used for configuring the context.</param>
    public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) {}

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<User>()
            .HasMany(user => user.UserRoles)
            .WithOne(userRoles => userRoles.User)
            .HasForeignKey(userRoles => userRoles.UserId)
            .IsRequired();

        modelBuilder.Entity<UserRole>().ToTable("user_roles");
        modelBuilder.Entity<UserRole>()
            .HasMany(role => role.UserRoles)
            .WithOne(userRoles => userRoles.Role)
            .HasForeignKey(userRoles => userRoles.RoleId)
            .IsRequired();

        modelBuilder.Entity<IdentityUserToken<long>>().ToTable("user_tokens");
        modelBuilder.Entity<UserRoleOwners>().ToTable("user_role_owners");
        modelBuilder.Entity<IdentityRoleClaim<long>>().ToTable("user_role_claims");
        modelBuilder.Entity<IdentityUserLogin<long>>().ToTable("user_logins");
        modelBuilder.Entity<IdentityUserClaim<long>>().ToTable("user_claims");

        modelBuilder.Entity<Car>().ToTable("cars");
        modelBuilder.Entity<Car>().Property(car => car.Mark).IsRequired();
        modelBuilder.Entity<Car>().Property(car => car.Mark).HasMaxLength(100);
        modelBuilder.Entity<Car>().Property(car => car.Model).IsRequired();
        modelBuilder.Entity<Car>().Property(car => car.Model).HasMaxLength(100);
        modelBuilder.Entity<Car>().Property(car => car.Color).IsRequired();
        modelBuilder.Entity<Car>().Property(car => car.Color).HasMaxLength(100);
        modelBuilder.Entity<Car>()
            .HasOne(car => car.User)
            .WithMany(user => user.Cars)
            .HasForeignKey(car => car.UserId);
    }
}
