import React, {useEffect, useState} from "react";
import "./Chat.css";
import stompClient from "../../config/socket";

const ChatForm = () => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState([]);
    const [selectedSender, setSelectedSender] = useState(null);
    const [messageInput, setMessageInput] = useState("");

    const handleSenderClick = (senderId) => {
        setSelectedSender(senderId);
    };

    // const getMessage = () => {
    //     if (loggingUser != null) {
    //         const id = loggingUser.id;
    //         axios.get(`http://localhost:8080/api/messages/user/${id}`).then((response) => {
    //             console.log(response.data);
    //             setMessage(response.data);
    //         });
    //     }
    // };

    const handleSubmitChat = () => {
        if (messageInput.trim() !== "") {
            const data = {
                content: messageInput,
                sender: {
                    id: loggingUser.id,
                },
                receiver: {
                    id: selectedSender,
                },
            };

            sendMessage(JSON.stringify(data));
            setMessageInput("");
        }
    };

    useEffect(() => {
        // getMessage();

        stompClient.connect({}, (f) => {
            console.log("STOMP Connected " + f);
            stompClient.subscribe(`/topic/${loggingUser.id}`, (data) => {
                const receivedMessage = JSON.parse(data.body);
                setMessage(prevMessages => [...prevMessages, receivedMessage]);
            }, {});
        }, (error) => {
            console.error("STOMP Connection Error:", error);
        });
        return () => {
            stompClient.disconnect();
        };
    }, []);

    const sendMessage = (data) => {
        stompClient.send("/app/chat", {}, data);
    };


    return (
        <div className="chat-container">
            <div className="sidebar-chat">
                <h3>
                    Chat
                </h3>
                <div className={"distance"}>
                    {message.length !== 0 && conversations.map(item => (
                        <div className={"content-chat"}>
                            <img className={"avt-img-chat"} src={item.sender.img} alt=""/>
                            <p onClick={() => handleSenderClick(item.sender.id)}>{item.sender.username}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-form-container">
                <div className="chat-messages">
                    {message.length !== 0 && message.map(item => (
                        <div
                            key={item.id}
                            className={`chat-message ${item.sender.id === loggingUser.id ? 'user-message' : 'other-message'}`}
                        >
                            <div
                                className={`avatar ${item.sender.id === loggingUser.id ? 'user-avatar' : 'other-avatar'}`}>
                                <img src={item.sender.img} alt=""/>
                            </div>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>

                <form className="message-input">
                    <div className="message-content">
                        <input
                            style={{width: 950}}
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSubmitChat();
                                }
                            }}
                        />
                        <button type="button" className={"button-chat"} onClick={handleSubmitChat}>
                            Send
                        </button>
                    </div>
                    <div className="receiver-avatar">
                        {selectedSender && (
                            <img src={message.find(item => item.sender.id === selectedSender)?.sender.img} alt=""/>
                        )}
                    </div>
                </form>


            </div>
        </div>
    );
};

export default ChatForm;
