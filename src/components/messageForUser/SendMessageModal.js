import React, {useState} from 'react';
import "./SendMessageModal.css"

const SendMessageModal = () => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const handleSendMessage = () => {
        // Xử lý logic gửi tin nhắn ở đây
        console.log('Tin nhắn đã được gửi:', message);

        // Đặt lại giá trị tin nhắn sau khi gửi
        setMessage('');
    };

    return (
        <div className="modal-content" role="document">
            <div className="modal-header">
                <h4 id="contained-modal-title-vcenter" className="modal-title">
                    Gửi tin nhắn đầu tiên
                </h4>
                <button type="button" className="close">
                    <span aria-hidden="true">x</span>
                    <span className="sr-only">Close</span>
                </button>
            </div>
            <div className="modal-body">
                <table>
                    <tbody>
                    <tr>
                        <td colSpan="2">
                            <textarea
                                placeholder="message ..."
                                name="message"
                                type="text"
                                className="form-control"
                                value={message}
                                onChange={handleMessageChange}></textarea>
                            <span className="error-message"></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="btn-fill btn btn-danger"
                    fdprocessedid="64dl5n"
                    onChange={handleSendMessage}>
                    <span>Gửi tin nhắn</span>
                </button>
                <button type="button" className="btn btn-default" fdprocessedid="rdhgs">
                    <span>Đóng</span>
                </button>

            </div>
        </div>
    )

}
export default SendMessageModal;