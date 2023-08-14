import React, {useEffect, useState} from "react";
import "./ViewRent.css";
import {Tooltip, Typography} from "@material-tailwind/react";
import axios from "axios";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton,
} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import {
    CheckIcon,
    XMarkIcon,
    ChatBubbleBottomCenterIcon,
    BugAntIcon,
    CurrencyDollarIcon
} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";


const ViewRent = () => {
    const [bookings, setBookings] = useState([]);
    const [userBookingRents, setUserBookingRents] = useState([]);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {id} = useParams();
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));


    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/booked/${id}`)
            .then(response => {
                console.log(response.data);
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/booking-users/${id}`)
            .then(response => {
                console.log(response.data);
                setUserBookingRents(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return `<p class="text-warning">Chờ phản hồi</p>`;
            case 2:
                return `<p class="text-success">Đã xác nhận</p>`;
            case 3:
                return `<p class="text-info">Đã hoàn thành</p>`;
            case 4:
                return `<p class="text-danger">Đã hủy</p>`;
            default:
                return `<p class="text-secondary">Trạng thái không xác nhận</p>`;
        }
    }


    const handleClickAccept = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/accept/${bookingId}`).then((response) => {
            const updatedBooking = response.data;

            const index = bookings.findIndex(booking => booking.id === bookingId);

            if (index !== -1) {

                const updatedBookings = [...bookings];
                updatedBookings[index] = updatedBooking;

                setBookings(updatedBookings);

                alert("Xác nhận thành công");
            }
        })
    }

    const handleClickFinish = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/${bookingId}/finish`).then((response) => {
            const updatedBooking = response.data;

            const index = userBookingRents.findIndex(booking => booking.id === bookingId);

            if (index !== -1) {

                const updatedBookings = [...userBookingRents];
                updatedBookings[index] = updatedBooking;

                setUserBookingRents(updatedBookings);

                alert("Hoàn thành thành công");
            }
        })
    }
    const handleClickReject = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/reject/${bookingId}`).then((response) => {
            const updatedBooking = response.data;

            const index = bookings.findIndex(booking => booking.id === bookingId);

            if (index !== -1) {

                const updatedBookings = [...bookings];
                updatedBookings[index] = updatedBooking;

                setBookings(updatedBookings);

                alert("Hủy bỏ thành công");
            }
        })
    }


    const handlePopoverClick = () => {
        setTooltipVisible(true);
    };

    const handlePopoverMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (

        <>
            {((loggingUser.status === 1) || (loggingUser.status === 2)) &&
                <>
                    <Typography
                        variant="h4"
                        color="red"
                        className="mb-8 mt-4 text-center"
                        textGradient
                    >
                        Danh sách thuê
                    </Typography>
                    <div className={"main-box clearfix"}>
                        <div className={"table-responsive"}>
                            <table className={"table user-list table table-hover"}>
                                <thead>
                                <tr>
                                    <th>
                                        <span>Người thuê</span>
                                    </th>
                                    <th>
                                        <span>Địa chỉ</span>
                                    </th>
                                    <th>
                                        <span>Thời gian bắt đầu</span>
                                    </th>
                                    <th>
                                        <span>Thời gian kết thúc</span>
                                    </th>
                                    <th>
                                        <span>Số giờ</span>
                                    </th>
                                    <th className={"text-center"}>
                                        <span>Trạng thái</span>
                                    </th>
                                    <th>
                                        <span>Thành tiền</span>
                                    </th>
                                    <th className={"text-center"}>
                                        <span>Hành động</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="user_info">
                                                <Link to={`/detail-rent/${booking.id}`}>
                                                    <img src={booking.bookingUser.img} alt="Avatar"
                                                         className="user-avatar"/>
                                                </Link>
                                                <div className="fill-name">
                                                    {booking.bookingUser.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={"fill-address"}>{booking.bookingUser?.address.name}</div>
                                        </td>
                                        <td>
                                            <div
                                                className={"fill-startTime"}>{new Date(booking.startTime).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour24: true
                                            })}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={"fill-endTim"}>{new Date(booking.endTime).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour24: true + "PM"
                                            })}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={"total_time"}>
                                                {(() => {
                                                    const start = new Date(booking.startTime);
                                                    const end = new Date(booking.endTime);
                                                    const diffInMilliseconds = end - start;

                                                    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
                                                    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                                                    return `${hours} giờ ${minutes} phút`;
                                                })()}
                                            </div>
                                        </td>
                                        <td className={"text-center"}>
                                            <span dangerouslySetInnerHTML={{__html: getStatusString(booking.status)}}/>
                                        </td>
                                        <td>
                                            <div className="total_cost">{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(booking.total)}</div>
                                        </td>
                                        <td className={"text-center"}>
                                            <Popover placement="bottom">
                                                <PopoverHandler>
                                                    <i className="bi bi-three-dots icon-hover"
                                                       onClick={handlePopoverClick}
                                                       onMouseLeave={handlePopoverMouseLeave}></i>
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    {booking.status === 1 ?
                                                        <>
                                                            <Tooltip content="Xác nhận" show={tooltipVisible}>
                                                                <IconButton
                                                                    variant="text" color="green"
                                                                    onClick={() => handleClickAccept(booking.id)}
                                                                >
                                                                    <CheckIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip content="Từ chối" show={tooltipVisible}>
                                                                <IconButton variant="text" color="red"
                                                                            onClick={() => handleClickReject(booking.id)}
                                                                >
                                                                    <XMarkIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                        : ""
                                                    }

                                                    {booking.status === 2 ?
                                                        <Tooltip content="Rút tiền" show={tooltipVisible}>
                                                            <IconButton variant="text" color="yellow"
                                                                // onClick={() => handleClickReject(booking.id)}
                                                            >
                                                                <CurrencyDollarIcon className="h-4 w-4"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        : ""
                                                    }

                                                    {booking.status === 3 ?
                                                        <Tooltip content="Báo cáo" show={tooltipVisible}>
                                                            <IconButton variant="text" color="blue-gray"
                                                                // onClick={() => handleClickReject(booking.id)}
                                                            >
                                                                <BugAntIcon className="h-4 w-4"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        : ""
                                                    }
                                                    <Tooltip content="Chat" show={tooltipVisible}>
                                                        <IconButton variant="text" color="blue-gray">
                                                            <ChatBubbleBottomCenterIcon className="h-4 w-4"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }

            {loggingUser.status === 0 &&
                <>
                    <div className={"col-lg-9 rent-user"}>
                        <div className={`title`}>
                            <p>Danh sách đơn</p>
                        </div>
                        <div className={`list-rent`}>
                            <table className={`table table-hover`}>
                                <thead>
                                <tr>
                                    <th>Người bạn thuê</th>
                                    <th>Ngày thuê</th>
                                    <th>Thời gian thuê</th>
                                    <th>Tổng đơn</th>
                                    <th className={`text-center`}>Trạng thái</th>
                                    <th className={`text-center`}>Hành động</th>
                                </tr>
                                </thead>

                                <tbody>
                                {userBookingRents.map(userBookingRent =>
                                    <tr key={userBookingRent.id} className={`row-rent`}>
                                        <td>
                                            <div className="partner_info">
                                                <Link to={`/detail-user-rent/${userBookingRent.id}`}>
                                                    <img src={userBookingRent.bookedUser?.img} alt="Avatar"
                                                         className="user-avatar"/>
                                                </Link>
                                                <div className="fill-name">
                                                    {userBookingRent.bookedUser?.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {new Date(userBookingRent.startTime).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{(() => {
                                                const start = new Date(userBookingRent.startTime);
                                                const end = new Date(userBookingRent.endTime);
                                                const diffInMilliseconds = end - start;

                                                const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
                                                const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                                                return `${hours} giờ ${minutes} phút`;
                                            })()}</span>
                                        </td>
                                        <td>
                                        <span>{new Intl.NumberFormat('vi-VN',
                                            {style: 'currency', currency: 'VND'})
                                            .format(userBookingRent.total)}</span>
                                        </td>
                                        <td className={"text-center"}>
                                            <span
                                                dangerouslySetInnerHTML={{__html: getStatusString(userBookingRent.status)}}/>
                                        </td>
                                        {userBookingRent.status === 2 &&
                                            <td className={"text-center"}>
                                                <button onClick={() => handleClickFinish(userBookingRent.id)}
                                                        className={`btn-info`}>Hoàn thành
                                                </button>
                                            </td>
                                        }

                                        {userBookingRent.status !== 2 &&
                                            <td></td>
                                        }

                                    </tr>
                                )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }

        </>
    );
};

export default ViewRent;
