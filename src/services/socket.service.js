import stompClient from "../config/socket";

const handleConnect = () => {

}


const handleErr = () => {

}
const sendMessage = (data) => {
    stompClient.send("/app/chat", {}, data);
}


stompClient.connect({}, handleConnect, handleErr);
export {sendMessage}

export default stompClient;