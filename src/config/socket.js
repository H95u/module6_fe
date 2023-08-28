import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let socket = new WebSocket('ws://localhost:8080/api/ws/websocket');
let stompClient = Stomp.over(socket);
// stompClient.activate();

export default stompClient;