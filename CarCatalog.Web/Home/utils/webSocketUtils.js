class WebSocketUtils {
    connect() {   
        this.websocket = new WebSocket(API_WEBSOCKET);
        this.websocket.onopen = function(event) {
            console.log("Connected WebCoket!");
        };
    
        this.websocket.onmessage = function(event) {
            console.log("Received message:", event.data);
            alert(event.data);
        };
    
        this.websocket.onerror = function(event) {
            console.log("Error:", event);
        };
    
        this.websocket.onclose = function(event) {
            console.log("Connection closed");
        };
    }

    close() {
        this.websocket.close(1000, 'Closing, because logout user');
    }
}

const webSocketUtils = new WebSocketUtils();
webSocketUtils.connect();
