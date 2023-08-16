import React, {useState} from 'react';
import "./FormNavBar.css"
import MessageReceiver from "./MessageReceiver";

const FormNavBar = ({ showForm, onClose }) => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const receiverId = loggingUser.id;
    const [showMessages, setShowMessages] = useState(false);
    // const [showForm, setShowForm] = useState(true);

    const handleViewMessagesClick = () => {
        setShowMessages(true);
    };

    const handleCloseMessagesClick = (event) => {
        event.preventDefault();
        // setShowForm(false);
        onClose();
    };

    return (
        <div>
            {showForm ? (
                <div className="notification-form">
                    <div className="content_form">
                        <div className="tab-notif-common">
                            <h5><span>Thông báo</span></h5>
                            <div className="tab-action">
                                <p className={showMessages ? 'active' : ''} onClick={handleViewMessagesClick}>
                                    <span>Tin nhắn </span></p>
                                <p className=""><span>Khác</span></p>
                                <p className=""><span>Theo dõi</span></p>
                                <p className="active"><span>Tương tác</span></p>
                            </div>
                        </div>
                        <div>
                            <div className="infinite-scroll-component" style={{height: '400px', overflow: 'auto'}}>
                                {showMessages && <MessageReceiver receiverId={receiverId}/>}
                            </div>
                        </div>
                        <button onClick={handleCloseMessagesClick} className="btn btn-secondary">Đóng</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default FormNavBar;