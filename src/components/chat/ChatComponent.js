import React, {useState} from "react";
import "./Chat.css";

const ChatForm = () => {


    return (
        <div className="chat-container">
            <div className="sidebar-chat">
                <h3>Chat Với</h3>
                <ul>
                    <li>
                        <img src="" alt=""/>
                    </li>
                </ul>
            </div>
            <div className="chat-form-container">
                <div className="chat-messages">
                        <div
                            className="chat-message user-message other-message"
                        >
                            <div className="avatar user-avatar other-avatar"/>
                            <p></p>
                        </div>
                </div>
                <form className="message-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                    />
                    <button className={"button-chat"}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatForm;
