import React, {useEffect, useState} from "react";
import "./ViewRent.css";
import {IconButton, Popover, PopoverContent, PopoverHandler, Tooltip, Typography} from "@material-tailwind/react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {BackwardIcon, BugAntIcon, CheckIcon, ForwardIcon} from "@heroicons/react/20/solid";
import FeedbackOnViewRent from "./FeedbackOnViewRent";
import Report from "./Report";
import ReactPaginate from "react-paginate";

const ViewUserRent = () => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const [userBookingRents, setUserBookingRents] = useState([]);
    const {id} = useParams();
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [showUserReport, setShowUserReport] = useState(false);
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(0);
    const [initialValueReport, setInitialValueReport] = useState({
        accuserId: null,
        accusedId: null,
        accusedName: ""
    })

    const handleShowUserReport = (booking) => {
        setShowUserReport(true);
        setInitialValueReport({
            accuserId: loggingUser.id,
            accusedId: booking.bookedUser?.id,
            accusedName: booking.bookedUser?.username
        });
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(userBookingRents.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = userBookingRents.slice(startIndex, endIndex);

    const handleHideReport = () => {
        setShowUserReport(false);
    }

    const handlePopoverClick = () => {
        setTooltipVisible(true);
    };

    const handlePopoverMouseLeave = () => {
        setTooltipVisible(false);
    };

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
                    variant="h4"
                    color="red"
                    className="mb-8 mt-4 text-center"
                    textGradient
                >
                    Danh sách đơn đã thuê
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
                            <th className={`text-center`}>Tùy chọn</th>
                        </tr>
                        </thead>

                        <tbody>
                        {currentPageData.map(userBookingRent =>
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
                                {userBookingRent.status === 2 &&
                                    <td className={"text-center"}>
                                        <Tooltip content="Xác nhận">
                                            <IconButton
                                                variant="text" color="green"
                                                onClick={() => handleClickFinishUser(userBookingRent.id)}
                                            >
                                                <CheckIcon className="h-4 w-4"/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                }
                                {userBookingRent.status === 3 || userBookingRent.status === 5 ? (
                                    <td className={"text-center"}>
                                        <Popover placement="bottom">
                                            <PopoverHandler>
                                                <i className="bi bi-three-dots icon-hover"
                                                   onClick={handlePopoverClick}
                                                   onMouseLeave={handlePopoverMouseLeave}></i>
                                            </PopoverHandler>
                                            <PopoverContent>
                                                <Tooltip content="Báo cáo" show={tooltipVisible}>
                                                    <IconButton variant="text" color="blue-gray"
                                                                onClick={() => handleShowUserReport(userBookingRent)}
                                                    >
                                                        <BugAntIcon className="h-4 w-4"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <FeedbackOnViewRent receiverId={userBookingRent.bookedUser?.id} />
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                ) : (
                                    <td></td>
                                )}
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>

                <div>
                    <ReactPaginate
                        previousLabel={<BackwardIcon className="h-5 w-5"/>}
                        nextLabel={<ForwardIcon className="h-5 w-5"/>}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        onPageChange={handlePageClick}
                        activeClassName={"active"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                    />
                </div>

                <Report
                    show={showUserReport}
                    accuserId={initialValueReport.accuserId}
                    accusedId={initialValueReport.accusedId}
                    accusedName={initialValueReport.accusedName}
                    onHide={handleHideReport}
                />
            </div>
        </>
    );
};
export default ViewUserRent;
