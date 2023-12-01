﻿namespace CarCatalog.Shared.Enum;

/// <summary>
///     Enumeration representing user roles within the system.
/// </summary>
public enum RolesEnum
{
    /// <summary>
    ///     Represents a regular user role with the ability to look at car data.
    /// </summary>
    User = 1,

    /// <summary>
    ///     Represents a manager role with the ability to manage car data.
    /// </summary>
    Manager = 2,

    /// <summary>
    ///     Represents an administrator role with full system access.
    /// </summary>
    Admin = 3
}
