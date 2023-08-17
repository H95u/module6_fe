import React, {useEffect, useRef, useState} from 'react';
import "./FormNavBar.css"
import MessageReceiver from "./MessageReceiver";
const FormNavBar = ({ showForm, onClose }) => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const receiverId = loggingUser.id;
    const [showMessages, setShowMessages] = useState(false);
    const formNavBarRef = useRef(null);

    const handleViewMessagesClick = () => {
        setShowMessages(true);
    };
    const handleCloseMessagesClick = (event) => {
        event.preventDefault();
        onClose();
    };
    const handleClickOutside = (event) => {
        if (formNavBarRef.current && !formNavBarRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (showForm) {
            setShowMessages(false);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);
    return (
        <div ref={formNavBarRef}>
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