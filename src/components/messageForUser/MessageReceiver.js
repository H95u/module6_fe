import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./FormNavbar.css"

const MessageReceiver = ({receiverId}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchReceivedMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/sends/received/${receiverId}`);
                const receivedMessages = response.data;
                setMessages(receivedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchReceivedMessages().then();
    }, [receiverId]);

    return (
        <>
            <div className={"my-message"}>
                <h1 className={"head-message"}>Nội dung tin nhắn</h1>
                <hr/>
                {messages.length === 0 ? (
                    <p>Không có tin nhắn nào.</p>
                ) : (
                    <ul className="message-list">
                        {messages.map((message) => (
                            <li key={message.id} className="message-item">
                                <div className="message-container">
                                    <p className={"sender"}>Người gửi: {message.sender.username}</p>
                                    <p className={"sender-content"}>Thời gian gửi: {message.timestamp}</p>
                                    <p className={"sender-content"}>Nội dung: {message.content}</p>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                )}
                <hr/>
            </div>
        </>
    );
};

export default MessageReceiver;
