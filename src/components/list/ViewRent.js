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
import {CheckIcon, XMarkIcon, CurrencyDollarIcon, BugAntIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";


const ViewRent = () => {
    const [bookings, setBookings] = useState([]);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {id} = useParams();


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

    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return `<p class="text-secondary">Chờ phản hồi</p>`;
            case 2:
                return `<p class="text-success">Đã xác nhận</p>`;
            case 3:
                return `<p class="text-danger">Đã hủy</p>`;
            default:
                return "Trạng thái không xác định";
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
                            <th></th>
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
                                    <div className={"fill-address"}>{booking.bookingUser.address.name}</div>
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
                                <td>
                                    <Popover placement="bottom">
                                        <PopoverHandler>
                                            <i className="bi bi-three-dots icon-hover"
                                               onClick={handlePopoverClick}
                                               onMouseLeave={handlePopoverMouseLeave}></i>
                                        </PopoverHandler>
                                        <PopoverContent>
                                            {booking.status !== 2 && booking.status !== 3 ?
                                                <Tooltip content="Xác nhận" show={tooltipVisible}>
                                                    <IconButton
                                                        variant="text" color="green"
                                                        onClick={() => handleClickAccept(booking.id)}
                                                    >
                                                        <CheckIcon className="h-4 w-4"/>
                                                    </IconButton>
                                                </Tooltip>
                                                : ""
                                            }
                                            {booking.status !== 3 ?
                                                <Tooltip content="Huỷ lịch" show={tooltipVisible}>
                                                    <IconButton variant="text" color="red"
                                                                onClick={() => handleClickReject(booking.id)}
                                                    >
                                                        <XMarkIcon className="h-4 w-4"/>
                                                    </IconButton>
                                                </Tooltip>
                                                : ""
                                            }
                                            <Tooltip content="Báo cáo" show={tooltipVisible}>
                                                <IconButton variant="text" color="blue-gray">
                                                    <BugAntIcon className="h-4 w-4"/>
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
    );
};

export default ViewRent;
