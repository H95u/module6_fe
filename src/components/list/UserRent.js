import "./UserRent.css";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import MenuBar from "../user-info/MenuBar";
import React, {useEffect, useState} from "react";

export default function UserRent() {

    const [bookings, setBookings] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/booking-users/${id}`)
            .then(response => {
                console.log(response.data);
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, []);

    const getStatus = (status) => {
        switch (status) {
            case 1:
                return "Chờ phản hồi";
            case 2:
                return "Xác nhận";
            case 3:
                return "Đã hoàn thành";
        }
    };


    return (
        <>
            <div className={"rent-user-container"}>
                <div className={"row"}>
                    <MenuBar/>
                    <div className={"col-lg-9 rent-user"}>
                        <div className={`title`}>
                            <p>Danh sách đơn</p>
                        </div>
                        <div className={`list-rent`}>
                            <table className={`table table-hover`}>
                                <thead>
                                <tr>
                                    <th>Tên người bạn thuê</th>
                                    <th>Ngày thuê</th>
                                    <th>Thời gian thuê</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                                </thead>

                                <tbody>
                                {bookings.map(booking =>
                                    <tr key={booking.id} className={`row-rent`}>
                                        <td>
                                            <div className="partner_info">
                                                <Link to={`/detail-user-rent/${booking.id}`}>
                                                    <img src={booking.bookedUser.img} alt="Avatar"
                                                         className="user-avatar"/>
                                                </Link>
                                                <div className="fill-name">
                                                    {booking.bookedUser.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {new Date(booking.startTime).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <span>{(() => {
                                                const start = new Date(booking.startTime);
                                                const end = new Date(booking.endTime);
                                                const diffInMilliseconds = end - start;

                                                const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
                                                const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                                                return `${hours} giờ ${minutes} phút`;
                                            })()}</span>
                                        </td>
                                        <td>{getStatus(booking.status)}</td>
                                        {booking.status === 2 &&
                                            <>
                                                <td>
                                                    <button className={`btn btn-info`}>Hoàn thành</button>
                                                </td>
                                            </>
                                        }
                                    </tr>
                                )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}