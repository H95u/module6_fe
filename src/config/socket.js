import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let sock = new SockJS('http://localhost:8080/api/ws');
let stompClient = Stomp.over(sock);
stompClient.activate();

export default stompClient;