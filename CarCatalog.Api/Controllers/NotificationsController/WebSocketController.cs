using CarCatalog.Api.Configurations.NotificationManager;
using CarCatalog.Api.Extensions;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.NotificationsController;

/// <summary>
///     Controller for managing WebSocket connections.
/// </summary>
[ApiController]
[Route("api/ws")]
public class WebSocketController : ControllerBase
{
    private readonly NotificationsWebSocketHandler _webSocketHandler;
    private readonly NotificationTask _notificationTask;

    /// <summary>
    ///     Initializes a new instance of the <see cref="WebSocketController"/> class.
    /// </summary>
    /// <param name="webSocketHandler">The WebSocket handler for managing WebSocket connections.</param>
    /// <param name="notificationTask">The task for sending periodic notifications to connected clients.</param>
    public WebSocketController(NotificationsWebSocketHandler webSocketHandler, NotificationTask notificationTask)
    {
        _webSocketHandler = webSocketHandler;
        _notificationTask = notificationTask;
    }

    /// <summary>
    ///     Establishes a WebSocket connection for the authenticated user.
    /// </summary>
    /// <returns>
    ///     An HTTP 200 OK response if the WebSocket connection is established successfully.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.User)]
    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
       if (!HttpContext.WebSockets.IsWebSocketRequest)
            return BadRequest();

        var userId = User.GetUserId();

        var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

        await _notificationTask.SendIfStartAsync(socket);

        await _webSocketHandler.HandleWebSocketAsync(userId, socket);

        return Ok();
    }
}
