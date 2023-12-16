using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace CarCatalog.Bll.Services.NotificationManager;

/// <summary>
///     Interface for managing WebSocket connections associated with user notifications.
/// </summary>
public interface INotificationConnectionManager
{
    /// <summary>
    ///     Gets all user WebSocket connections.
    /// </summary>
    /// <returns>
    ///     A <see cref="ConcurrentDictionary{TKey,TValue}"/> containing user IDs and their associated <see cref="UserWebSocket"/> instances.
    /// </returns>
    ConcurrentDictionary<string, UserWebSocket> GetAll();

    /// <summary>
    ///     Adds a WebSocket connection for the specified user.
    /// </summary>
    /// <param name="userId">The ID of the user associated with the WebSocket connection.</param>
    /// <param name="webSocket">The WebSocket connection to add.</param>
    void AddSocket(long userId, WebSocket webSocket);

    /// <summary>
    ///     Gets the user ID associated with a WebSocket connection.
    /// </summary>
    /// <param name="webSocket">The WebSocket connection to retrieve the user ID for.</param>
    /// <returns>
    ///     The user ID associated with the specified WebSocket connection.
    /// </returns>
    string GetUserId(WebSocket webSocket);

    /// <summary>
    ///     Removes the WebSocket connection associated with the specified user ID.
    /// </summary>
    /// <param name="userId">The ID of the user whose WebSocket connection should be removed.</param>
    /// <returns>
    ///     A <see cref="Task"/> representing the asynchronous operation of removing the WebSocket connection.
    /// </returns>
    Task RemoveSocket(string userId);
}

/// <summary>
///     Represents a user's WebSocket connection.
/// </summary>
/// <param name="UserId">The ID of the user associated with the WebSocket connection.</param>
/// <param name="WebSocket">The WebSocket connection.</param>
public record UserWebSocket(long UserId, WebSocket WebSocket);

/// <summary>
///     Implementation of <see cref="INotificationConnectionManager"/> for managing WebSocket connections.
/// </summary>
public class NotificationConnectionManager : INotificationConnectionManager
{
    /// <summary>
    ///     Represents a collection of user WebSocket connections.
    /// </summary>
    private ConcurrentDictionary<string, UserWebSocket> _sockets = new();

    /// <inheritdoc />
    public ConcurrentDictionary<string, UserWebSocket> GetAll()
    {
        return _sockets;
    }

    /// <inheritdoc />
    public string GetUserId(WebSocket socket)
    {
        return _sockets.FirstOrDefault(kvp => kvp.Value.WebSocket == socket).Key;
    }

    /// <inheritdoc />
    public void AddSocket(long userId, WebSocket socket)
    {
        _sockets.TryAdd(CreateConnectionId(), new(userId, socket));
    }

    /// <inheritdoc />
    public async Task RemoveSocket(string socketId)
    {
        _sockets.TryRemove(socketId, out var userSocket);
        if (userSocket?.WebSocket != null)
        {
            await userSocket.WebSocket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure,
                                    statusDescription: "Closed by the ConnectionManager",
                                    cancellationToken: CancellationToken.None);
        }
    }

    /// <summary>
    ///     Generates a unique connection ID using a new GUID.
    /// </summary>
    /// <returns>
    ///     A string representation of the newly generated GUID, serving as a unique connection ID.
    /// </returns>
    private string CreateConnectionId()
    {
        return Guid.NewGuid().ToString();
    }
}
