using CarCatalog.Api.Attributes;
using System.Text;

namespace CarCatalog.Api.Middlewares;

/// <summary>
///     Middleware for logging incoming requests.
/// </summary>
public class RequestLogResourceMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLogResourceMiddleware> _logger;

    /// <summary>
    ///     Initializes a new instance of the <see cref="RequestLogResourceMiddleware"/> class.
    /// </summary>
    /// <param name="next">The next middleware in the pipeline.</param>
    /// <param name="logger">The logger for logging request information.</param>
    public RequestLogResourceMiddleware(RequestDelegate next, ILogger<RequestLogResourceMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    /// <summary>
    ///     Invokes the middleware to log incoming requests and their bodies.
    /// </summary>
    /// <param name="context">The HTTP context for the current request.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public async Task InvokeAsync(HttpContext context)
    {
        var hasIgnoreLoggerAttribute = context.GetEndpoint()?.Metadata.GetMetadata<IgnoreLoggingAttribute>() != null;

        if (hasIgnoreLoggerAttribute)
        {
            await _next(context);
        }
        else
        {
            context.Request.EnableBuffering();

            var buffer = new byte[Convert.ToInt32(context.Request.ContentLength)];

            await context.Request.Body.ReadAsync(buffer, 0, buffer.Length);

            var requestBody = Encoding.UTF8.GetString(buffer);

            context.Request.Body.Seek(0, SeekOrigin.Begin);

            var stringBuilder = new StringBuilder(Environment.NewLine);

            foreach (var header in context.Request.Headers)
            {
                stringBuilder.AppendLine($"{header.Key}:{header.Value}");
            }

            stringBuilder.AppendLine($"Body:{requestBody}");

            _logger.LogInformation(stringBuilder.ToString());

            await _next(context);
        }
    }
}
