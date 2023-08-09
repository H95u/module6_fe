import {Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Message() {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

    const [message, setMessage] = useState([]);
    const [selectedSender, setSelectedSender] = useState(null);
    const handleSenderClick = (senderId) => {
        setSelectedSender(senderId);
    };

    const renderChatContent = () => {
        if (!selectedSender) {
            return <div>Chọn một người gửi để xem tin nhắn</div>;
        }

        const selectedMessage = message.find((item) => item.sender.id === selectedSender);

        if (!selectedMessage) {
            return <div>Không tìm thấy tin nhắn của người gửi này</div>;
        }

        return (
            <div>
                <p>{selectedMessage.timestamp}</p>
                <p>{selectedMessage.content}</p>
                {/* Hiển thị các tin nhắn khác của người gửi nếu cần */}
            </div>
        );
    };
    const getMessage = () => {
        if (loggingUser != null) {
            const id = loggingUser.id;
            axios.get(`http://localhost:8080/api/messages/user/${id}`).then((response) => {
                console.log(response.data)
                setMessage(response.data);
            });
        }
    };
    useEffect(() => {
        getMessage()
    }, [])

    return (
        <>
            <Popover placement="left">
                <PopoverHandler>
                    <img onClick={getMessage} id="chat-icon" src="/chat.png" alt="chat"/>
                </PopoverHandler>
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
                                <input className={"w-50"} placeholder="Nhập tin nhắn..." type="text"/>
                                <button className={"send-btn ml-4"}>
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