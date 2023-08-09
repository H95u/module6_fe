import React, { useEffect, useState } from "react";
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
import MenuBar from "../user-info/MenuBar";
import {CheckIcon, XMarkIcon, CurrencyDollarIcon} from "@heroicons/react/20/solid";

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
    }, []);

    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return "Chờ phản hồi";
            case 2:
                return ""
            default:
                return "Trạng thái không xác định";
        }
    }


    const handlePopoverClick = () => {
        setTooltipVisible(true);
    };

    const handlePopoverMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <>
            <div className={"container-view"}>
                <div className={"row"}>
                    <MenuBar/>
                    <div className={"col-lg-9"}>
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
                                            <span>Thời gian kết thúc</span>
                                        </th>
                                        <th>
                                            <span>Thời gian bắt đầu</span>
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
                                                <div className="user-info">
                                                    <img src={booking.bookingUser.img} alt="Avatar" className="user-avatar" />
                                                    <div className="fill-name">
                                                        {booking.bookingUser.username}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={"fill-address"}>{booking.bookingUser.address.name}</div>
                                            </td>
                                            <td>
                                                <div className={"fill-startTime"}>{new Date(booking.startTime).toLocaleString(undefined, {
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
                                                <div className={"fill-endTim"}>{new Date(booking.endTime).toLocaleString(undefined, {
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
                                                <span className={"label label-default"}>{getStatusString(booking.status)}</span>
                                            </td>
                                            <td>
                                                <div className={"total_cost"}></div>
                                            </td>
                                            <td>
                                            <Popover placement="left">
                                                <PopoverHandler>
                                                    <i className="bi bi-three-dots icon-hover" onClick={handlePopoverClick}
                                                       onMouseLeave={handlePopoverMouseLeave}></i>
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <Tooltip content="Xác nhận" show={tooltipVisible}>
                                                        <IconButton variant="text" color="green">
                                                            <CheckIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    &ensp;
                                                    <Tooltip content="Huỷ lịch" show={tooltipVisible}>
                                                        <IconButton variant="text" color="red">
                                                            <XMarkIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    &ensp;
                                                    <Tooltip content="Nhận tiền" show={tooltipVisible}>
                                                        <IconButton variant="text" color="yellow">
                                                            <CurrencyDollarIcon className="h-4 w-4" />
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewRent;
