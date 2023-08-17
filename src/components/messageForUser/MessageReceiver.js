import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./FormNavBar.css"
import {IconButton, Textarea} from "@material-tailwind/react";

const MessageReceiver = ({receiverId}) => {
    const [messages, setMessages] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    useEffect(() => {
        const fetchReceivedMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/sends/received/${receiverId}`);
                const receivedMessages = response.data;
                setMessages(receivedMessages);
            } catch (error) {
                alert('Error fetching messages:' + error);
            }
        };
        fetchReceivedMessages().then();
    }, [receiverId]);
    const handleReplySubmit = async (e, messageId, senderId) => {
        e.preventDefault();
        try {
            const response = await
                axios.post("http://localhost:8080/api/sends/sender", {
                    content: replyContent,
                    senderId: receiverId,
                    receiverId: senderId,
                });
            alert("Gửi tin thành công");
            setReplyContent('');
        } catch (error) {
            alert('Error sending message:' + error);
        }
    }
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
                {/*<form onSubmit={(e) => handleReplySubmit(e,receiverId,messages[0].sender.id)}>*/}
                {/*    <h1>Phản hồi tin nhắn</h1>*/}
                {/*    <textarea*/}
                {/*        value={replyContent}*/}
                {/*        onChange={(e) => setReplyContent(e.target.value)}*/}
                {/*        placeholder={"Nhập nội dung tin nhắn"}*/}
                {/*        required*/}
                {/*        />*/}
                {/*    <button type={"submit"}>Gửi</button>*/}
                {/*</form>*/}
            </div>
            <form onSubmit={(e) => handleReplySubmit(e, receiverId, messages[0].sender.id)}>
                <div
                    className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                    <div className="flex">
                        <IconButton variant="text" className="rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        </IconButton>
                        <IconButton variant="text" className="rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <Textarea
                        rows={1}
                        resize={true}
                        placeholder="Your Message"
                        className="min-h-full !border-0 focus:border-transparent"
                        containerProps={{
                            className: "grid h-full",
                        }}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        required
                    />

                    <div>
                        <button type={"submit"}>
                            <IconButton variant="text" className="rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                    />
                                </svg>
                            </IconButton>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MessageReceiver;