import React, { useEffect, useState } from "react";
import "./ViewRent.css";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import MenuBar from "../user-info/MenuBar";

const ViewRent = () => {
    const [bookings, setBookings] = useState([]);
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
                                                <div className={"fill-name"}>
                                                        {booking.bookingUser.username}
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
                                                    <i className="bi bi-three-dots icon-hover"></i>
                                                </PopoverHandler>
                                                <PopoverContent>
                                                        <button className={"btn btn-success"}>Xác nhận</button>
                                                    &ensp;
                                                        <button className={"btn btn-dark"}>Huỷ lịch</button>
                                                    &ensp;
                                                    <button className={"btn btn-info"}>Nhận tiền</button>
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
