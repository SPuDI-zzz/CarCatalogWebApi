class Notifications {
    async handelerStartNotifications() {
        const message = document.getElementById('notificationMessage').value;
        await fetch(`${API_URL_NOTIFICATIONS_START}?message=${message}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });
    }

    async handelerStopNotifications() {
        await fetch(`${API_URL_NOTIFICATIONS_STOP}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });
    }

    displayUsers() {
        const htlm = `
            <div class="notification-container">
                <div>
                    <button type="button" onclick="notificationsPage.handelerStartNotifications();">Start</button>
                    <input type="text" id="notificationMessage">
                </div>
                <button type="button" onclick="notificationsPage.handelerStopNotifications();">Stop</button>
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = htlm;
    }

    render() {
        this.displayUsers();        
    }
}

const notificationsPage = new Notifications();
