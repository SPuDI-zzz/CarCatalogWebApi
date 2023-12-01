using CarCatalog.Api.Attributes;

namespace CarCatalog.Api.Middlewares;

public class RequestLogResourceMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLogResourceMiddleware> _logger;

    public RequestLogResourceMiddleware(RequestDelegate next, ILogger<RequestLogResourceMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

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

            
        }
    }
}
