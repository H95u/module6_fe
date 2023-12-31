import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import "./Message.css"

const MessageForm = ({senderId, receiverId,closeModal,isOpen}) => {
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(isOpen);
    const [sentMessageCount, setSentMessageCount] = useState(0);

    useEffect(() => {
        if (modalIsOpen) {
            fetchSentMessages().then();
        }
    }, [modalIsOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const message = {
                content: content,
                senderId: senderId,
                receiverId: receiverId
            };
            const response = await axios.post("http://localhost:8080/api/sends/sender", message);
            setContent('');
            alert("Gửi tin thành công")
            setTimeout(() => {
                setNotification('');
                handleModalClose();
            }, 0);
        } catch (error) {
            console.error(error);
            setNotification('Có lỗi xảy ra khi gửi tin nhắn.');
        }
    };
    const fetchSentMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/sends/received/${senderId}`);
            const sentMessages = response.data;
            setSentMessageCount(sentMessages.length);
        } catch (error) {
            console.error('Error fetching sent messages:', error);
        }
    };
    const handleModalClose = (event) => {
        if (event) {
            event.preventDefault();
        }
        setModalIsOpen(false);
        setContent('');
        setNotification('');
        closeModal();
    };

    return (
        <>
            {notification && <div>{notification}</div>}
            <Modal
                show={modalIsOpen}
                onHide={()=>handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="contents-title">Hộp thoại gửi tin </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{color:'red'}}>*</span>Nội dung</h1>
                        <div>
                            <textarea
                                id="message"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="custom-textarea"
                                placeholder={"Soạn thảo ở đây"}
                            ></textarea>
                        </div>
                        <Modal.Footer>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary"
                                    style={{color: 'white', backgroundColor: 'red'}}>Gửi
                            </button>
                            &ensp;
                            <button onClick={handleModalClose} className="btn btn-secondary"
                                    data-bs-dismiss="modal">Đóng
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default MessageForm;