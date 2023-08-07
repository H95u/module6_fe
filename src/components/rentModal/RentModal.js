import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@material-tailwind/react";
import axios from "axios";

export default function RentModal ({show, onClose, onAccept, onReject}) {
    const [userData, setUserData] = useState({});
    const [bookingData, setBookingData] = useState("");

    useEffect(() => {
        const bookingId = 1;
        axios.get(`/api/bookings/${bookingId}`)
            .then((response) => {
                setBookingData(response.data);
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return(
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Thông tin thuê</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Tên người dùng: {userData.username}</p>
                        <p>Thời gian bắt đầu thuê: {bookingData.startTime}</p>
                        <p>Thời gian kết thúc thuê: {bookingData.endTime}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" onClick={onReject}>
                        Từ chối
                    </Button>
                    <Button color="green" onClick={onAccept}>
                        Chấp nhận
                    </Button>
                    <Button color="blue-gray" onClick={onClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            );
        </>
    )
}