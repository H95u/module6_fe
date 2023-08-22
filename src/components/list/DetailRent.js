import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./DetailRent.css";
import SidebarRent from "./SidebarRent";
import {Button, IconButton, Tooltip} from "@material-tailwind/react";
import {CheckIcon} from "@heroicons/react/20/solid";

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
                return `<p class="text-danger">Đang hẹn hò</p>`;
            case 3:
                return `<p class="text-success">Đã xác nhận</p>`;
            case 5:
                return `<p class="text-info">Đã hoàn thành</p>`;
            case 4:
                return `<p class="text-danger">Đã hủy</p>`;
            default:
                return `<p class="text-secondary">Trạng thái không xác nhận</p>`;
        }
    }

    return (
        <>
            <div className={"rent-detail-container"}>
                <div className={"row"}>
                    <SidebarRent/>
                    <div className={"col-lg-9 bill-user-container"}>
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
                                <div className={`col-md-4 bill-card`}>
                                    <div className={`partner-card`}>
                                        <img src={booking.bookingUser?.img} alt="Avatar"
                                             className="partner-avatar"/>
                                    </div>
                                    <div className={`partner-name`}>
                                        <p><i className="bi bi-person"></i>&ensp;{booking.bookingUser?.username}
                                        </p>
                                    </div>
                                    <div className={`partner-name`}>
                                        <p><i className="bi bi-geo-alt"></i>&ensp;{booking.bookingUser?.address?.name}
                                        </p>
                                    </div>
                                </div>

                                <div className={`col-md-8 detail`}>
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
                                            <h5>Thời gian bắt đầu</h5>
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
                                            <h5>Tổng đơn</h5>
                                        </div>
                                        <div className={`col-md-6 user-time`}>
                                            <p>
                                                {new Intl.NumberFormat('vi-VN',
                                                    {style: 'currency', currency: 'VND'})
                                                    .format(booking.total)}
                                            </p>
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                    <div className={`row`}>
                                        <div className={`col-md-6 user-time`}>
                                            <h5>Trạng thái</h5>
                                        </div>
                                        <div className={`col-md-6 user-time d-flex`}>
                                            <span dangerouslySetInnerHTML={{__html: getStatusString(booking.status)}}/>
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                </div>
                                <hr className={`hr1`}/>
                                <div className={`detail-button`}>
                                    <Button color="gray" onClick={handleViewRent}>Đóng</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}