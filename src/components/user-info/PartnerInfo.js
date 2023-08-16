import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./partnerprofile.css";
import {Button, Textarea, Typography, IconButton} from "@material-tailwind/react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Feedback from "../feedback/Feedback";
import RechargeModal from "../recharge-modal/RechargeModal";
import stompClient, {sendMessage} from "../../services/socket.service";


export default function PartnerInfo() {
    const navigate = useNavigate();
    const isLoggedIn = JSON.parse(localStorage.getItem("loggingUser"));
    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    const [address, setAddress] = useState("");
    const {id} = useParams();
    const [showRentForm, setShowRentForm] = useState(false)
    const [showPrice, setShowPrice] = useState(true)
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        stompClient.connect({}, () => {
            console.log("STOMP Connected");
                stompClient.subscribe('/topic/messages/chat', (data) => {
                    console.log(data)
                }, {})
        }, (error) => {
            console.error("STOMP Connection Error:", error);
        });
        return () => {
            stompClient.disconnect();
        };
    },[])

    const openModal = () => {
        // goi socket join
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitChat = () => {
        let data = {
            content: messageInput,
            sender: {
                id: isLoggedIn.id,
            },
            receiver: {
                id: +id
            }

        }
        sendMessage(JSON.stringify(data))
        setMessageInput("");
        // closeModal();
    };

    const handleShowRentForm = () => setShowRentForm(true);
    const handleCloseRentForm = () => setShowRentForm(false)

    const handleStartChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndTime(e.target.value);
    };

    const [showRecharge, setShowRecharge] = useState(false);
    const handleCloseRecharge = () => setShowRecharge(false);
    const handleShowRecharge = () => setShowRecharge(true);
    const handleOptionChange = (e) => {
        const selectedOptionId = e.target.value;
        const selected = options.find(option => option.id == selectedOptionId);
        setSelectedOption(selected);
        setSelectedOptionId(e.target.value);
    };

    const handleChat = (e) => {
        setMessageInput(e.target.value)
    }

    const calculateTotalPrice = () => {
        if (startTime != "" && endTime != "" && selectedOption !== null) {
            const startTimestamp = new Date(startTime).getTime();
            const endTimestamp = new Date(endTime).getTime();
            const timeDifference = endTimestamp - startTimestamp;
            const hours = timeDifference / (1000 * 60 * 60);
            const total = hours * user.price + (selectedOption != null ? selectedOption.price : 0);
            if (hours < 0) {
                return 0;
            }
            return total.toFixed(0);
        }
        return 0;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`).then((response) => {
            setUser(response.data);
            setOptions(response.data.options);
            setAddress(response.data.address);
            window.scrollTo(0, 0);
        })
    }, [id])

    function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    function createBooking() {
        const booking = {
            startTime: startTime,
            endTime: endTime,
            option: {
                id: selectedOptionId
            },
            bookingUser: {
                id: isLoggedIn.id
            },
            bookedUser: {
                id: +id
            },
            total: calculateTotalPrice(),
        }
        return booking;
    }

    function checkBookingError(error) {
        if (error.response.data === 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Thời gian kết thúc phải sau thời gian bắt đầu!',
            })
        } else if (error.response.data === 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Thời gian bắt đầu không hợp lệ!',
            })
        } else if (error.response.status === 406) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Ôi trùng lịch rồi ! Đã có người thuê từ ${formatDate(error.response.data.startTime)} 
                                       đến ${formatDate(error.response.data.endTime)}`,
            })
        }
    }

    function rechargeNow() {
        Swal.fire({
            icon: 'error',
            title: 'Úi giời !!...',
            text: 'Có đủ tiền đâu mà ham ? Nạp tiền ngay !!',
        })
        handleShowRecharge();
        handleCloseRentForm();
        setStartTime("");
    }

    function successRent() {
        const booking = createBooking();
        axios.post(`http://localhost:8080/api/bookings/rent`, booking).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'OK...',
                text: 'Bạn đã đặt lịch hẹn thành công!',
                footer: '<a href="#" id="viewOrderLink">Đến trang xem thông tin đơn ?</a>'
            })
            document.getElementById('viewOrderLink').addEventListener('click', () => {
                navigate(`/view-transaction/${isLoggedIn.id}`);
            });
            setSelectedOption(null);
            calculateTotalPrice();
            handleCloseRentForm();
        })
            .catch((error) => {
                checkBookingError(error);
            });
    }

    const handleSubmitRent = () => {
        if (isLoggedIn) {
            if (calculateTotalPrice() > isLoggedIn.money) {
                rechargeNow();
            } else if (startTime == "" || endTime == "" || selectedOption == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Úi giời !!...',
                    text: 'Chưa chọn thời gian mà đã đòi thuê !!',
                })
            } else {
                successRent();
            }
        } else {
            localStorage.setItem("userId", id);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn phải đăng nhập để thuê!',
            })
            navigate("/login");
        }
    };

    return (
        <>
            <RechargeModal showRecharge={showRecharge} handleCloseRecharge={handleCloseRecharge}/>
            <Modal backdrop={"static"} show={showRentForm} onHide={handleCloseRentForm}>
                <Modal.Header>
                    <Modal.Title>Thông tin thuê</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor={"rent-name"} className={"form-label"}>Tên người cho
                            thuê</label>
                        <Typography variant="h3" color="cyan" textGradient>
                            {user.nickname}
                        </Typography>
                    </div>
                    <div>
                        <label htmlFor={"rent-start"} className={"form-label"}>Thời gian bắt đầu
                            thuê</label>
                        <input onChange={handleStartChange} type={"datetime-local"} className={"form-control"}
                               id={"rent-start"} name={"startTime"}/>
                    </div>
                    <div className={"mb-6"}>
                        <label htmlFor={"rent-end"} className={"form-label"}>Thời gian kết thúc
                            thuê</label>
                        <input onChange={handleEndChange} type={"datetime-local"} className={"form-control"}
                               id={"rent-end"} name={"endTime"}/>
                    </div>
                    <div className="grid gap-6 mb-2">
                        <select onChange={handleOptionChange} name="option" className="form-select"
                                aria-label="Default select example">
                            <option className={"font-bold"} value="" selected>Chọn dịch vụ</option>
                            {options.map(item => (
                                <option value={item.id}>{item.name} - {item.price}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={"rent-price"} className={"form-label"}>Giá</label>
                        <Typography variant="h3" color="cyan" textGradient>
                            {user.price != null &&
                                <h1>{new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(user.price)}/h</h1>
                            }
                            {user.price == null &&
                                <h1>---</h1>
                            }
                        </Typography>
                    </div>
                    <div className="grid gap-6">
                        <Textarea label="Tin nhắn ..."/>
                    </div>
                    <hr/>
                    <Typography variant="h4" color="green" textGradient>
                        Tổng tiền : &nbsp;
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(calculateTotalPrice())}
                    </Typography>

                </Modal.Body>
                <Modal.Footer>

                    <div>
                        <Button color={"red"} onClick={handleSubmitRent}>Thuê</Button>
                        <Button className={"ml-4"} color={"blue"} onClick={handleCloseRentForm}>Đóng</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <div className={"partner-info"}>
                <div className={`partner-profile`}>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`cards`}>
                            <div>
                                <a href={`#`}><img src={user.img} alt={``}/></a>
                            </div>
                            <div>
                                <p className={"ready"}>Đang sẵn sàng</p>
                            </div>
                            <div className={"dob"}>
                                <span>Ngày tham gia :</span><span><span> {user.createdDate} </span></span></div>
                            <hr/>
                        </div>
                        <div className={"info"}>
                            <div className={`d-flex justify-content-between`} id={`inner-info`}>
                                <div>
                                    <h2>{user.nickname}</h2>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-md-3 col-xs-6"}>
                                    <div className={"item-nav-name"}>
                                        <span>Số lượt xem</span>
                                    </div>
                                    <div className={"item-nav-value"}>
                                        <span>{user.viewCount} lượt</span>
                                    </div>
                                </div>
                                <div className={"col-md-3 col-xs-6"}>
                                    <div className={"item-nav-name"}>
                                        <span>Số lượt thuê</span>
                                    </div>
                                    <div className={"item-nav-value"}>
                                        <span>{user.rentCount} lượt</span>
                                    </div>
                                </div>
                                <div className={"col-md-3 col-xs-6"}>
                                    <div className={"item-nav-name"}>
                                        <span>Ngày sinh</span>
                                    </div>
                                    <div className={"item-nav-value"}>
                                        <span>{user.dob}</span>
                                    </div>
                                </div>
                                <div className={"col-md-3 col-xs-6"}>
                                    <div className={"item-nav-name"}>
                                        <span>Địa chỉ</span>
                                    </div>
                                    <div className={"item-nav-value"}>
                                        <span>{address?.name}</span>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={"option"}>
                                <h2>Dịch vụ</h2>
                                <div className={`row`}>
                                    {options.map(item => (
                                        <div className={`service-name`} key={item.id}>
                                            <a className={"btn btn-outline-danger"}>{item.name}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr/>
                            <div className={"profile"}>
                                <h2>Thông tin</h2>
                                <div className={"album-of-player"}>
                                    <a>
                                        <img
                                            src="https://playerduo.net/api/upload-service/thumbs/medium/66f8b716-ee52-4590-aa0a-73bd28590f5f__2c6a5460-2cb6-11ee-a657-a54d6be1d46a__player_album.jpg"
                                            alt=""/>
                                    </a>
                                </div>
                                <p></p>
                                <p>- Giọng bắc</p>
                                <p>- Mng thuê ủng hộ tui đóng tiền đi học nha ^^</p>
                                <p></p>
                                <p>🤍 Liên minh huyền thoại ( Ad, Sp, Mid lo được )</p>
                                <p></p>
                                <p>🤍 Valorant ,CS GO ( chơi được từ bkim đổ xuống )</p>
                                <p></p>
                                <p>🤍 Naraka ( top 1 ez )</p>
                                <p></p>
                                <p>🤍 Onl Camx5</p>
                                <p></p>
                                <p>🤍 ... game gì cũng chơi</p>
                            </div>
                            <hr/>
                            <Feedback/>
                        </div>
                        <div className={"action"}>
                            {showPrice && <>
                                <div className={`row`}>
                                    <div className={`col-sm-8`}>
                                        {user.price != null &&
                                            <h1>{new Intl.NumberFormat('vi-VN',
                                                {style: 'currency', currency: 'VND'})
                                                .format(user.price)}/h</h1>
                                        }
                                        {user.price == null &&
                                            <h1>---</h1>
                                        }
                                    </div>
                                </div>
                            </>}

                            <div className={`booking`}><a className={"btn btn-danger"}
                                                          onClick={handleShowRentForm}>THUÊ</a></div>
                            <div><a className={"btn btn-light"}>TẶNG TIỀN</a></div>
                            <div><a className={"btn btn-light"} onClick={openModal}><i
                                className={"bi bi-chat-square-fill"}></i> CHAT</a>
                                <Modal show={isModalOpen} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title
                                            style={{color: "deep-orange", fontWeight: "bold"}} >Chat</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div
                                            className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                                            <div className="flex">
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                                <IconButton variant="text" className="rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                            <Textarea
                                                rows={1}
                                                resize={true}
                                                placeholder="Your Message"
                                                className="min-h-full !border-0 focus:border-transparent"
                                                containerProps={{
                                                    className: "grid h-full",
                                                }}
                                                onChange={handleChat}
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                            <div>
                                                <IconButton variant="text" className="rounded-full"
                                                            onClick={handleSubmitChat}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                                        />
                                                    </svg>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className={"ml-4"} color={"blue"} onClick={closeModal}>Đóng</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
