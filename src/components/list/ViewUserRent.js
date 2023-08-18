import React, {useEffect, useState} from "react";
import "./ViewRent.css";
import {Typography} from "@material-tailwind/react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const ViewUserRent = () => {
    const [userBookingRents, setUserBookingRents] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/booking-users/${id}`)
            .then(response => {
                setUserBookingRents(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);


    const getStatusBookingUser = (status) => {
        switch (status) {
            case 1:
                return `<p class="text-warning">Chờ phản hồi</p>`;
            case 2:
                return `<p class="text-success">Đã xác nhận</p>`;
            case 3:
                return `<p class="text-info">Đã hoàn thành</p>`;
            case 5:
                return `<p class="text-info">Đã hoàn thành</p>`;
            case 4:
                return `<p class="text-danger">Đã hủy</p>`;
            default:
                return `<p class="text-secondary">Trạng thái không xác nhận</p>`;
        }
    }



    const handleClickFinishUser = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/${bookingId}/finish-user`).then((response) => {
            const updatedBooking = response.data;

            const index = userBookingRents.findIndex(booking => booking.id === bookingId);

            if (index !== -1) {

                const updatedBookings = [...userBookingRents];
                updatedBookings[index] = updatedBooking;

                setUserBookingRents(updatedBookings);

                Swal.fire({
                        title: 'Xác nhận thành công !',
                        text: 'Cảm ơn bạn đã sử dụng dịch vụ,Hẹn gặp lại !',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        })
    }



    return (

        <>
            <div className={"rent-user"}>
                <Typography
                    color={"pink"}
                    variant={"h3"}
                    className={"text-center"}
                >
                    Danh sách đơn
                </Typography>

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
                                                dangerouslySetInnerHTML={{__html: getStatusBookingUser(userBookingRent.status)}}/>
                                </td>
                                {userBookingRent.status === 2 ?
                                    <td className={"text-center"}>
                                        <button onClick={() => handleClickFinishUser(userBookingRent.id)}
                                                className={`btn-info`}>Hoàn thành
                                        </button>
                                    </td>
                                    : <td></td>
                                }
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default ViewUserRent;
