import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./DetailUserRent.css";
import SidebarRent from "./SidebarRent";
import {IconButton, Tooltip} from "@material-tailwind/react";
import {CheckIcon} from "@heroicons/react/20/solid";

export default function DetailUserRent() {
    const [userBookingRent, setUserBookingRent] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/${id}`)
            .then(response => {
                setUserBookingRent(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    const handleClickFinish = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/${bookingId}/finish`).then((response) => {
            setUserBookingRent(response.data)
            alert("Hoàn thành thành công");
        })
    }

    const handleViewRent = () => {
        navigate(`/view-transaction/${userBookingRent.bookingUser?.id}`);
    };

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return `<p class="text-secondary">Chờ phản hồi</p>`;
            case 2:
                return `<p class="text-success">Xác nhận</p>`;
            case 3:
                return `<p class="text-info">Đã hoàn thành</p>`;
            case 3:
                return `<p class="text-danger">Bị hủy</p>`;
            default:
                return "Trạng thái không xác định";
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
                                    <p className={`rent-code`}>Mã đơn: #{userBookingRent.id}</p>
                                </div>
                            </div>

                        </div>
                        <hr className={`hr1`}/>
                        <div className={`inner-bill`}>
                            <div className={`row`}>
                                <div className={`col-md-4 bill-card`}>
                                    <div className={`partner-card`}>
                                        <img src={userBookingRent.bookedUser?.img} alt="Avatar"
                                             className="partner-avatar"/>
                                    </div>
                                    <div className={`partner-name`}>
                                        <p><i className="bi bi-person"></i>&ensp;{userBookingRent.bookedUser?.username}
                                        </p>
                                    </div>
                                </div>

                                <div className={`col-md-8 detail`}>
                                    <div className={`row`}>
                                        <div className={`col-md-6 user-time`}>
                                            <h5>Dịch vụ</h5>
                                        </div>
                                        <div className={`col-md-6 user-time`}>
                                            <p>{userBookingRent.option?.name}</p>
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                    <div className={`row`}>
                                        <div className={`col-md-6 user-time`}>
                                            <h5>Ngày thuê</h5>
                                        </div>
                                        <div className={`col-md-6 user-time`}>
                                            <p>{new Date(userBookingRent.startTime).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                            })}</p>
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                    <div className={`row`}>
                                        <div className={`col-md-6 user-time`}>
                                            <h5>Thời gian thuê</h5>
                                        </div>
                                        <div className={`col-md-6 user-time`}>
                                            <p>
                                                {(() => {
                                                    const start = new Date(userBookingRent.startTime);
                                                    const end = new Date(userBookingRent.endTime);
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
                                                    .format(userBookingRent.total)}
                                            </p>
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                    <div className={`row`}>
                                        <div className={`col-md-6 user-time`}>
                                            <h5>Trạng thái</h5>
                                        </div>
                                        <div className={`col-md-6 user-time d-flex`}>
                                            <span
                                                dangerouslySetInnerHTML={{__html: getStatus(userBookingRent.status)}}/>
                                            {userBookingRent.status === 2 &&
                                                <Tooltip content="Hoàn thành" className={`icon-accept`}>
                                                    <IconButton className={`icon-accept`}
                                                        variant="text" color="green"
                                                        onClick={() => handleClickFinish(userBookingRent.id)}
                                                    >
                                                        <CheckIcon className="h-4 w-4"/>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </div>
                                    </div>
                                    <hr className={`hr1`}/>
                                </div>
                                <hr className={`hr1`}/>
                                <div className={`detail-button`}>
                                    <button className={`btn btn-secondary`} onClick={handleViewRent}>Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}