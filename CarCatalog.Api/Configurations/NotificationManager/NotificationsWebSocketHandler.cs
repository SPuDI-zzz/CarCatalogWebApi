using CarCatalog.Bll.Services.NotificationManager;
using System.Net.WebSockets;

namespace CarCatalog.Api.Configurations.NotificationManager;

/// <summary>
///     WebSocket handler for managing notifications.
/// </summary>
/// <remarks>
///     This class extends the <see cref="WebSocketHandler"/> base class to handle WebSocket connections.
/// </remarks>
public class NotificationsWebSocketHandler : WebSocketHandler
{
    /// <summary>
    ///     Initializes a new instance of the <see cref="NotificationsWebSocketHandler"/> class.
    /// </summary>
    /// <param name="notificationConnectionManager">The notification connection manager for managing WebSocket connections.</param>
    public NotificationsWebSocketHandler(INotificationConnectionManager notificationConnectionManager) : base(notificationConnectionManager)
    {
        NotificationConnectionManager = notificationConnectionManager;
    }

    /// <summary>
    ///     Handles a WebSocket connection asynchronously.
    /// </summary>
    /// <param name="userId">The ID of the user associated with the WebSocket connection.</param>
    /// <param name="webSocket">The WebSocket connection to handle.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of handling the WebSocket connection.
    /// </returns>
    public async Task HandleWebSocketAsync(long userId, WebSocket webSocket)
    {
        OnConnected(userId, webSocket);

        await ReceiveAsync(webSocket, async (result) =>
        {
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await OnDisconnectedAsync(webSocket);
                return;
            }
        });
    }

    /// <summary>
    ///     Sends a message to all connected clients except the specified user.
    /// </summary>
    /// <param name="userId">The ID of the user to exclude from the message broadcast.</param>
    /// <param name="message">The message to send.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of broadcasting the message.
    /// </returns>
    public async Task SendMessageToAllExceptUserAsync(long userId, string message)
    {
        foreach (var pair in NotificationConnectionManager.GetAll())
        {
            if (pair.Value.UserId == userId)
                continue;

            if (pair.Value.WebSocket.State == WebSocketState.Open)
                await SendMessageAsync(pair.Value.WebSocket, message);
        }
    }

    /// <summary>
    ///     Asynchronously receives messages from the specified WebSocket connection.
    /// </summary>
    /// <param name="socket">The WebSocket connection to receive messages from.</param>
    /// <param name="handleMessage">The action to perform with the received WebSocket result.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of receiving messages from the WebSocket connection.
    /// </returns>
    private async Task ReceiveAsync(WebSocket socket, Action<WebSocketReceiveResult> handleMessage)
    {
        var buffer = new byte[1024 * 4];

        while (socket.State == WebSocketState.Open)
        {
            var result = await socket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer),
                                                   cancellationToken: CancellationToken.None);

            handleMessage(result);
        }
    }
}
