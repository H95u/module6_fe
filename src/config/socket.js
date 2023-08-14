
import { Client } from '@stomp/stompjs';

const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
});
export default stompClient;
