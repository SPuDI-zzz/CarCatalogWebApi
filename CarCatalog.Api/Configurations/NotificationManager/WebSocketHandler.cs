using CarCatalog.Bll.Services.NotificationManager;
using System.Net.WebSockets;
using System.Text;

namespace CarCatalog.Api.Configurations.NotificationManager;

/// <summary>
///     Base class for handling WebSocket connections.
/// </summary>
public abstract class WebSocketHandler
{
    /// <summary>
    ///     Gets or sets the notification connection manager for managing WebSocket connections.
    /// </summary>
    protected INotificationConnectionManager NotificationConnectionManager { get; set; }

    /// <summary>
    ///     Initializes a new instance of the <see cref="WebSocketHandler"/> class.
    /// </summary>
    /// <param name="notificationConnectionManager">The notification connection manager for managing WebSocket connections.</param>
    public WebSocketHandler(INotificationConnectionManager notificationConnectionManager)
    {
        NotificationConnectionManager = notificationConnectionManager;
    }

    /// <summary>
    ///     Called when a WebSocket connection is established.
    /// </summary>
    /// <param name="userId">The ID of the user associated with the WebSocket connection.</param>
    /// <param name="socket">The WebSocket connection.</param>
    public virtual void OnConnected(long userId, WebSocket socket)
    {
        NotificationConnectionManager.AddSocket(userId, socket);
    }

    /// <summary>
    ///     Called when a WebSocket connection is disconnected.
    /// </summary>
    /// <param name="socket">The WebSocket connection that is being disconnected.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of handling the disconnection.
    /// </returns>
    public virtual async Task OnDisconnectedAsync(WebSocket socket)
    {
        await NotificationConnectionManager.RemoveSocket(NotificationConnectionManager.GetUserId(socket));
    }

    /// <summary>
    ///     Sends a message to the specified WebSocket connection.
    /// </summary>
    /// <param name="socket">The WebSocket connection to send the message to.</param>
    /// <param name="message">The message to send.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of sending the message.
    /// </returns>
    public async Task SendMessageAsync(WebSocket socket, string message)
    {
        if (socket.State != WebSocketState.Open)
            return;

        var bytes = Encoding.UTF8.GetBytes(message);

        await socket.SendAsync(buffer: new ArraySegment<byte>(array: bytes, offset: 0, count: bytes.Length),
                               messageType: WebSocketMessageType.Text,
                               endOfMessage: true,
                               cancellationToken: CancellationToken.None);
    }

    /// <summary>
    ///     Sends a message to all connected WebSocket clients.
    /// </summary>
    /// <param name="message">The message to broadcast to all connected clients.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of broadcasting the message.
    /// </returns>
    public async Task SendMessageToAllAsync(string message)
    {
        foreach (var pair in NotificationConnectionManager.GetAll())
        {
            if (pair.Value.WebSocket.State == WebSocketState.Open)
                await SendMessageAsync(pair.Value.WebSocket, message);
        }
    }
}
