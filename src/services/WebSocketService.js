import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const SERVER_URL = 'http://localhost:8080/ws';

class WebSocketService {
    connect() {
        const socket = new SockJS(SERVER_URL);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/messages', (message) => {
                const messageData = JSON.parse(message.body);
            });
        });
    }

    sendMessage(message) {
        this.stompClient.send('/app/chat', {}, JSON.stringify(message));
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
    }
}

export default new WebSocketService();
