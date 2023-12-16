using CarCatalog.Api.Configurations.NotificationManager;
using CarCatalog.Api.Extensions;
using CarCatalog.Shared.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarCatalog.Api.Controllers.NotificationsController;

/// <summary>
///     Controller for managing notifications via WebSocket.
/// </summary>
[Route("api/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly NotificationsWebSocketHandler _notificationsMessageHandler;
    private readonly NotificationTask _notificationService;

    /// <summary>
    ///     Initializes a new instance of the <see cref="NotificationsController"/> class.
    /// </summary>
    /// <param name="notificationsMessageHandler">The WebSocket handler for managing notifications.</param>
    /// <param name="notificationService">The background task for managing notifications.</param>
    public NotificationsController(NotificationsWebSocketHandler notificationsMessageHandler, NotificationTask notificationService)
    {
        _notificationsMessageHandler = notificationsMessageHandler;
        _notificationService = notificationService;
    }

    /// <summary>
    ///     Starts sending notifications to all connected users via WebSocket.
    /// </summary>
    /// <param name="message">The message to be sent as a notification.</param>
    /// <returns>
    ///     An HTTP 200 OK response if the operation is successful.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.Admin)]
    [HttpGet("start")]
    public async Task<IActionResult> StartNotifications([FromQuery] string message)
    {
        var userId = User.GetUserId();
        await _notificationsMessageHandler.SendMessageToAllExceptUserAsync(userId, message);

        _notificationService.Start(message);

        return Ok();
    }

    /// <summary>
    ///     Stops sending notifications via WebSocket.
    /// </summary>
    /// <returns>
    ///     An HTTP 200 OK response if the operation is successful.
    ///     If the request is not authorized, returns an HTTP 401 Unauthorized response.
    ///     if the request is not access, returns an HTTP 403 Forbiden response.
    /// </returns>
    [Authorize(Policy = AppRoles.Admin)]
    [HttpGet("stop")]
    public async Task<IActionResult> StopNotifications()
    {
        await _notificationService.StopAsync();

        return Ok();
    }
}
