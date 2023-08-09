import React, { useState, useEffect } from 'react';

const MessageComponent = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [socket, setSocket] = useState(null); // Thêm biến trạng thái cho kết nối WebSocket

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/api/message');
        setSocket(newSocket);

        newSocket.onmessage = event => {
            setResponse(event.data);
        };

        return () => {
            newSocket.close();
        };
    }, []);

    const handleMessageChange = event => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        if (socket) {
            const messagePayload = {
                content: message, // Thêm trường thời gian
                sender: { id: 1 },      // Thay bằng id người gửi thực tế
                receiver: { id: 27 }    // Thay bằng id người nhận thực tế
            };
            socket.send(JSON.stringify(messagePayload));
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={handleMessageChange} />
            <button onClick={sendMessage}>Send</button>
            <div>Response: {response}</div>
        </div>
    );
};

export default MessageComponent;
