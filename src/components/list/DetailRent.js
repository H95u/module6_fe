import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./DetailRent.css";
import SidebarRent from "./SidebarRent";

export default function DetailRent() {
    const [booking, setBooking] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/${id}`)
            .then(response => {
                console.log(response.data);
                setBooking(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    const handleViewRent = () => {
        navigate(`/view-transaction/${booking.bookedUser?.id}`);
    };

    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return `<p class="text-warning">Chờ phản hồi</p>`;
            case 2:
                return `<p class="text-success">Đã xác nhận</p>`;
            case 3:
                return `<p class="text-info">Hoàn thành</p>`;
            default:
                return "Trạng thái không xác định";
        }
    }

    return (
        <>
            <div className={"rent-detail-container"}>
                <div className={"row"}>
                    <SidebarRent/>
                    <div className={"col-lg-9 bill-container"}>
                        <div className={`bill-detail`}>
                            <div className={`row`}>
                                <div className={`col-md-8`}>
                                    <p className={`title`}>Chi tiết đơn</p>
                                </div>
                                <div className={`col-md-4`}>
                                    <p className={`rent-code`}>Mã đơn: #{booking.id}</p>
                                </div>
                            </div>

                        </div>
                        <hr className={`hr1`}/>
                        <div className={`inner-bill`}>
                            <div className={`row`}>
                                <div className={`col-md-6 user`}>
                                    <h5>Tên người thuê</h5>
                                    <p>{booking.bookingUser?.username}</p>
                                </div>
                                <div className={`col-md-6 user`}>
                                    <h5>Địa chỉ</h5>
                                    <p>{booking.bookingUser?.address.name}</p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5>Thời gian bắt đầu</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <p>{new Date(booking.startTime).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour24: true
                                    })}</p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5 className={`th`}>Thời gian kết thúc</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <p>{new Date(booking.endTime).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour24: true + "PM"
                                    })}</p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5>Số giờ</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <p>
                                        {(() => {
                                            const start = new Date(booking.startTime);
                                            const end = new Date(booking.endTime);
                                            const diffInMilliseconds = end - start;

                                            const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
                                            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                                            return `${hours} giờ ${minutes} phút`;
                                        })()}
                                    </p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5>Dịch vụ</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <p>{booking.option?.name}</p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5>Trạng thái</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <span dangerouslySetInnerHTML={{__html: getStatusString(booking.status)}}/>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`row`}>
                                <div className={`col-md-6 user-time`}>
                                    <h5>Thành tiền</h5>
                                </div>
                                <div className={`col-md-6 user-time`}>
                                    <p>{new Intl.NumberFormat('vi-VN',
                                        { style: 'currency', currency: 'VND' })
                                        .format(booking.total)}</p>
                                </div>
                            </div>
                            <hr className={`hr1`}/>
                            <div className={`detail-button`}>
                                <button className={`btn btn-secondary`} onClick={handleViewRent}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}