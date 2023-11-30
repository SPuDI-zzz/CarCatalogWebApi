using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarCatalog.Dal.EntityFramework.Factories;

public static class DbContextOptionsFactory
{
    public static Action<DbContextOptionsBuilder> Configure(string connectionString)
    {
        return builder =>
        {
            builder.UseNpgsql(connectionString);
            builder.EnableSensitiveDataLogging();
            builder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        };
    }
}
