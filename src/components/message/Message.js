import {Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
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
                        <div className="col-md-4 chat-left">
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
                        <div className="col-md-8 chat-right">
                            <div id={"content"}>
                                {renderChatContent()}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}