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
    CurrencyDollarIcon,
    ForwardIcon,
    BackwardIcon
} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import MessageForm from "../messageForUser/MessageForm";
import ViewUserRent from "./ViewUserRent";
import Report from "./Report";
import ReactPaginate from "react-paginate";


const ViewRent = () => {
    const [bookings, setBookings] = useState([]);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {id} = useParams();
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const [showPartnerReport, setShowPartnerReport] = useState(false);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);
    const [initialValueReport, setInitialValueReport] = useState({
        accuserId: null,
        accusedId: null,
        accusedName: ""
    })

    const handleShowPartnerReport = (booking) => {
        setShowPartnerReport(true);
        setInitialValueReport({
            accuserId: loggingUser.id,
            accusedId: booking.bookingUser?.id,
            accusedName: booking.bookingUser?.username
        });
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(bookings.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = bookings.slice(startIndex, endIndex);

    const handleHideReport = () => {
        setShowPartnerReport(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/booked/${id}`)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    const getStatusBookedUser = (status) => {
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


    const handleClickAccept = (bookingId) => {
        axios.put(`http://localhost:8080/api/bookings/accept/${bookingId}`).then((response) => {
            const updatedBooking = response.data;

            const index = bookings.findIndex(booking => booking.id === bookingId);

            if (index !== -1) {

                const updatedBookings = [...bookings];
                updatedBookings[index] = updatedBooking;

                setBookings(updatedBookings);

                Swal.fire({
                        title: 'Xác nhận thành công !',
                        text: 'Chúc bạn có buổi hẹn hò vui vẻ !',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        })
    }

    const handleClickFinishPartner = (bookingId) => {
        Swal.fire({
            title: 'Bạn muốn nhận tiền ?',
            text: "Sau khi nhận,đơn của bạn sẽ chuyển sang trạng thái hoàn thành!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Thôi ! suy nghĩ lại rồi :D !',
            confirmButtonText: 'OK !'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:8080/api/bookings/${bookingId}/finish-partner`)
                        .then((response) => {
                            const updatedBooking = response.data;

                            const index = bookings.findIndex(booking => booking.id === bookingId);

                            if (index !== -1) {

                                const updatedBookings = [...bookings];
                                updatedBookings[index] = updatedBooking;

                                setBookings(updatedBookings);
                            }
                        })
                } catch (error) {
                    console.error(error);
                }
                Swal.fire({
                        title: 'Rút tiền thành công !',
                        text: 'Tiền đã được chuyển vào tài khoản của bạn !',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        });
    }

    const handleClickReject = (bookingId) => {
        Swal.fire({
            title: 'Bạn muốn từ chối đơn này ?',
            text: "Sau khi từ chối,đơn của bạn sẽ chuyển sang trạng thái đã hủy!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Thôi ! suy nghĩ lại rồi :D !',
            confirmButtonText: 'OK !'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`http://localhost:8080/api/bookings/reject/${bookingId}`).then((response) => {
                        const updatedBooking = response.data;

                        const index = bookings.findIndex(booking => booking.id === bookingId);

                        if (index !== -1) {

                            const updatedBookings = [...bookings];
                            updatedBookings[index] = updatedBooking;

                            setBookings(updatedBookings);
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
                Swal.fire({
                        title: 'Từ chối thành công !',
                        text: 'Chúc bạn có đối tượng phù hợp hơn !',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        });
    }

    const handlePopoverClick = () => {
        setTooltipVisible(true);
    };

    const handlePopoverMouseLeave = () => {
        setTooltipVisible(false);
    };

    const [showModal, setShowModal] = useState(false);
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');

    const handleOpenChat = (receiverId) => {
        if (loggingUser) {
            setSenderId(loggingUser.id);
            setReceiverId(receiverId);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    }

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
                        Danh sách đơn được thuê
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
                                        <span>Tùy chọn</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPageData.map((booking, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="user_info">
                                                <Link to={`/detail-rent/${booking.id}`}>
                                                    <img src={booking.bookingUser?.img} alt="Avatar"
                                                         className="user-avatar"/>
                                                </Link>
                                                <div className="fill-name">
                                                    {booking.bookingUser?.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={"fill-address"}>{booking.bookingUser?.address?.name}</div>
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
                                            <span
                                                dangerouslySetInnerHTML={{__html: getStatusBookedUser(booking.status)}}/>
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
                                                    {booking.status === 1 &&
                                                        <>
                                                            <Tooltip content="Xác nhận" show={tooltipVisible}>
                                                                <IconButton
                                                                    variant="text" color="green"
                                                                    onClick={() => handleClickAccept(booking.id)}
                                                                >
                                                                    <CheckIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            &ensp;
                                                            <Tooltip content="Từ chối" show={tooltipVisible}>
                                                                <IconButton variant="text" color="red"
                                                                            onClick={() => handleClickReject(booking.id)}
                                                                >
                                                                    <XMarkIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            &ensp;
                                                            <Tooltip content="Chat" show={tooltipVisible}>
                                                                <IconButton variant="text" color="blue-gray"
                                                                            onClick={() => handleOpenChat(booking.bookingUser?.id)}
                                                                >
                                                                    <ChatBubbleBottomCenterIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    }

                                                    {booking.status === 3 &&
                                                        <>
                                                            <Tooltip content="Nhận tiền" show={tooltipVisible}>
                                                                <IconButton variant="text" color="yellow"
                                                                            onClick={() => handleClickFinishPartner(booking.id)}
                                                                >
                                                                    <CurrencyDollarIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            &ensp;
                                                            <Tooltip content="Chat" show={tooltipVisible}>
                                                                <IconButton variant="text" color="blue-gray"
                                                                            onClick={() => handleOpenChat(booking.bookingUser?.id)}
                                                                >
                                                                    <ChatBubbleBottomCenterIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>

                                                    }

                                                    {booking.status === 5 &&
                                                        <>
                                                            <Tooltip content="Báo cáo" show={tooltipVisible}>
                                                                <IconButton variant="text" color="blue-gray"
                                                                            onClick={() => handleShowPartnerReport(booking)}>
                                                                    <BugAntIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            &ensp;
                                                            <Tooltip content="Chat" show={tooltipVisible}>
                                                                <IconButton variant="text" color="blue-gray"
                                                                            onClick={() => handleOpenChat(booking.bookingUser?.id)}
                                                                >
                                                                    <ChatBubbleBottomCenterIcon className="h-4 w-4"/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    }
                                                    {(booking.status === 2 || booking.status === 4) &&
                                                        <Tooltip content="Chat" show={tooltipVisible}>
                                                            <IconButton variant="text" color="blue-gray"
                                                                        onClick={() => handleOpenChat(booking.bookingUser?.id)}
                                                            >
                                                                <ChatBubbleBottomCenterIcon className="h-4 w-4"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    }
                                                    <div>
                                                        {showModal && (
                                                            <MessageForm
                                                                senderId={senderId}
                                                                receiverId={receiverId}
                                                                closeModal={closeModal}
                                                                isOpen={true}
                                                            />
                                                        )}
                                                    </div>

                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))}
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
                            show={showPartnerReport}
                            accuserId={initialValueReport.accuserId}
                            accusedId={initialValueReport.accusedId}
                            accusedName={initialValueReport.accusedName}
                            onHide={handleHideReport}
                        />
                    </div>
                </>
            }

            {loggingUser.status === 0 &&
                <ViewUserRent/>
            }
        </>
    );
};

export default ViewRent;