namespace CarCatalog.Api.Configurations.NotificationManager;

/// <summary>
///     Represents a task for sending periodic notifications to connected clients.
/// </summary>
/// <remarks>
///     This class manages a periodic timer to send notifications at fixed intervals
///     using a <see cref="NotificationsWebSocketHandler"/> for broadcasting messages to
///     connected clients.
/// </remarks>
public class NotificationTask
{
    /// <summary>
    ///     Represents the periodic task for sending notifications.
    /// </summary>
    private Task? _timerTask;

    /// <summary>
    ///     Represents the periodic timer for controlling the intervals between notifications.
    /// </summary>
    private PeriodicTimer _periodicTimer = new(TimeSpan.FromMinutes(5));

    /// <summary>
    ///     Represents the cancellation token source for stopping the periodic task.
    /// </summary>
    private CancellationTokenSource _cancellationTokenSource = new();

    private readonly NotificationsWebSocketHandler _notificationsWebSocketHandler;

    /// <summary>
    ///     Initializes a new instance of the <see cref="NotificationTask"/> class.
    /// </summary>
    /// <param name="notificationsWebSocketHandler">
    ///     The WebSocket handler for sending notifications to connected clients.
    /// </param>
    public NotificationTask(NotificationsWebSocketHandler notificationsWebSocketHandler)
    {
        _notificationsWebSocketHandler = notificationsWebSocketHandler;
    }

    /// <summary>
    ///     Starts the periodic task for sending notifications.
    /// </summary>
    /// <param name="message">The message to broadcast periodically.</param>
    public void Start(string message)
    {
        if (_cancellationTokenSource.IsCancellationRequested)
        {
            _periodicTimer = new(TimeSpan.FromMinutes(5));
            _cancellationTokenSource = new();
            _timerTask = DoWorkAsync(message);
            return;
        }
        
        if (_timerTask is null)
        {
            _timerTask = DoWorkAsync(message);
        }
    }

    /// <summary>
    ///     Asynchronously performs the periodic work of sending notifications.
    /// </summary>
    /// <param name="message">The message to send periodically.</param>
    /// <returns>A <see cref="Task"/> representing the asynchronous operation of sending notifications.</returns>
    private async Task DoWorkAsync(string message)
    {
        try
        {
            while (!_cancellationTokenSource.IsCancellationRequested && await _periodicTimer.WaitForNextTickAsync(_cancellationTokenSource.Token))
            {
                await _notificationsWebSocketHandler.SendMessageToAllAsync(message);
            }
        }
        catch (OperationCanceledException)
        {
        }
    }

    /// <summary>
    ///     Stops the periodic task for sending notifications.
    /// </summary>
    /// <returns>A <see cref="Task"/> representing the asynchronous operation of stopping the periodic task.</returns>
    public async Task StopAsync()
    {
        if (_timerTask is null || _cancellationTokenSource.IsCancellationRequested)
        {
            return;
        }

        await _cancellationTokenSource.CancelAsync();
        await _timerTask;
    }
}
