import React, { useEffect, useState } from "react";
import "./ViewRent.css";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

const ViewRent = () => {
    const [bookings, setBookings] = useState([]);
    const [totalHours, setTotalHours] = useState(0);

    useEffect(() => {
        axios.get("/api/bookings/booked/{id}")
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, []);

    return (
        <>
            <Typography
                variant="h3"
                color="red"
                className="mb-8 text-center"
                textGradient
            >
                Danh sách thuê
            </Typography>
            <div className={"container-view"}>
                <div className={"row"}>
                    <div className={"col-lg-12"}>
                        <div className={"main-box clearfix"}>
                            <div className={"table-responsive"}>
                                <table className={"table user-list"}>
                                    <thead>
                                    <tr>
                                        <th>
                                            <span>Người thuê</span>
                                        </th>
                                        <th>
                                            <span>Địa chỉ</span>
                                        </th>
                                        <th>
                                            <span>Thời gian thuê</span>
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
                                        <th colSpan={3}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className={"fill-name"}>
                                                    <img src={booking.bookingUser.image} alt="" />
                                                    <a href={booking.bookingUser.link} className={"user-link"}>
                                                        {booking.bookingUser.name}
                                                    </a>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={"fill-address"}>{booking.option.address}</div>
                                            </td>
                                            <td>
                                                <div className={"fill-startTime"}>{booking.startTime}</div>
                                            </td>
                                            <td>
                                                <div className={"fill-endTime"}>{booking.endTime}</div>
                                            </td>
                                            <td>
                                                <div className={"total_time"}>{booking.selectedHours}</div>
                                            </td>
                                            <td className={"text-center"}>
                                                <span className={"label label-default"}>{booking.status}</span>
                                            </td>
                                            <td>
                                                <div className={"total_cost"}></div>
                                            </td>
                                            <td>
                                                <button className={"btn btn-success"}>Xác nhận</button>
                                            </td>
                                            <td>
                                                <button className={"btn btn-dark"}>Huỷ lịch</button>
                                            </td>
                                            <td>
                                                <button className={"btn btn-info"}>Nhận tiền</button>
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
