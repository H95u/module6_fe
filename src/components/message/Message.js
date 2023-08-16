import React, { useEffect, useState } from "react";
import stompClient from "../../config/socket";
import axios from "axios";
import {Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Message() {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

    const [message, setMessage] = useState([]);
    const [selectedSender, setSelectedSender] = useState(null);
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();

    const getChat = () => {
      navigate("/chat")
    }

    const handleSenderClick = (senderId) => {
        setSelectedSender(senderId);
    };

    const renderChatContent = () => {
        if (!selectedSender) {
            return <div>Chọn một người gửi để xem tin nhắn</div>;
        }

        const selectedMessages = message.filter((item) => item.sender.id === selectedSender);

        if (selectedMessages.length === 0) {
            return <div>Không tìm thấy tin nhắn của người gửi này</div>;
        }

        return (
            <div>
                {selectedMessages.map((msg) => (
                    <div key={msg.id}>
                        <p>{msg.timestamp}</p>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
        );
    };

    const getMessage = () => {
        if (loggingUser != null) {
            const id = loggingUser.id;
            axios.get(`http://localhost:8080/api/messages/user/${id}`).then((response) => {
                setMessage(response.data);
            });
        }
    };

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
        getMessage();

        stompClient.connect({}, () => {
            console.log("STOMP Connected");
            stompClient.subscribe(`/topic/messages/${loggingUser.id}/${selectedSender}`, (data) => {
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
        <>
            <img onClick={getChat} id="chat-icon" src="/chat.png" alt="chat"/>
            <Popover placement="left">
                <PopoverContent id="chat-frame">
                    <div className="gray-background">
                        <Typography color={"blue"} variant={"h3"} textGradient>
                            Tin nhắn
                        </Typography>
                    </div>
                    <div className="row">
                        <div className="col-md-3 chat-left">
                            <table className="table table-hover">
                                <thead>
                                Danh sách người gửi
                                </thead>
                                <tbody>
                                {message.length !== 0 && message.map(item => (
                                    <tr>
                                        <th onClick={() => handleSenderClick(item.sender.id)}>{item.sender.username}</th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9 chat-right">
                            <div id={"content"}>
                                {renderChatContent()}
                            </div>
                            <div className={"mt-80 flex items-center"}>
                                <input className={"w-50"} placeholder="Nhập tin nhắn..." type="text" value={messageInput}
                                       onChange={(e) => setMessageInput(e.target.value)}/>
                                <button className={"send-btn ml-4"} onClick={handleSubmitChat}>
                                    <div className="svg-wrapper-1">
                                        <div className="svg-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor"
                                                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Gửi</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </PopoverContent>
            </Popover>
        </>
    );
}
