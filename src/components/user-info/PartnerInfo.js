import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./partnerprofile.css";
import {Button, Textarea, Typography} from "@material-tailwind/react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

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

    const handleShowRentForm = () => setShowRentForm(true);
    const handleCloseRentForm = () => setShowRentForm(false)

    const handleStartChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndTime(e.target.value);
    };
    const handleOptionChange = (e) => {
        const selectedOptionId = e.target.value;
        const selected = options.find(option => option.id == selectedOptionId);
        setSelectedOption(selected);
        setSelectedOptionId(e.target.value);
    };

    const calculateTotal = (startTime, endTime, price, optionPrice) => {
        const startTimestamp = new Date(startTime).getTime();
        const endTimestamp = new Date(endTime).getTime();
        const timeDifference = endTimestamp - startTimestamp;
        const hours = timeDifference / (1000 * 60 * 60);
        return hours * price + (selectedOption != null ? optionPrice : 0);
    }

    const calculateTotalPrice = () => {
        if (startTime != "" && endTime != "" && selectedOption !== null) {
            return calculateTotal(startTime, endTime, user.price, selectedOption != null ? selectedOption.price : 0);
        }
        return 0;
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`).then((response) => {
            setUser(response.data);
            setOptions(response.data.options);
            setAddress(response.data.address)
        })
    }, [])

    function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleSubmitRent = () => {
        if (isLoggedIn) {
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
            console.log(booking)
            axios.post(`http://localhost:8080/api/bookings/rent`, booking).then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ok...',
                    text: 'Bạn đã đặt hẹn thành công!',
                })
                setSelectedOption(null);
                calculateTotalPrice();
                handleCloseRentForm();
            })
                .catch((error) => {
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
                });
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
                            {user.price} đ/h
                        </Typography>
                    </div>
                    <div className="grid gap-6">
                        <Textarea label="Tin nhắn ..."/>
                    </div>
                    <hr/>
                    <Typography variant="h4" color="green" textGradient>
                        Tổng tiền :
                        {calculateTotalPrice()} đ
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
                                <span>Ngày tham gia:</span><span><span>{user.createdDate}</span></span></div>
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
                                        <span>{address.name}</span>
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
                        </div>
                        <div className={"action"}>
                            {showPrice && <>
                                <div className={`row`}>
                                    <div className={`col-sm-8`}>
                                        {user.price != null &&
                                            <h1>{user.price} đ/h</h1>
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
                            <div><a className={"btn btn-light"}><i className={"bi bi-chat-square-fill"}></i> CHAT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}