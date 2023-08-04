import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./partnerprofile.css";
import {Typography} from "@material-tailwind/react";
import Modal from "react-bootstrap/Modal";

export default function PartnerInfo() {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    const [newOptions, setNewOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);
    const [address, setAddress] = useState("");
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [showRentForm, setShowRentForm] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowRentForm = () => setShowRentForm(true);

    const handleCloseRentForm = () => setShowRentForm(false)


    const handleCheck = (id) => {
        setNewOptions(prev => {
            const isChecked = newOptions.includes(id);
            if (isChecked) {
                return newOptions.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        });
    }

    const handleSubmit = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        axios.post("http://localhost:8080/api/users/add-options", {
            optionIds: newOptions,

        }, config).then((response) => {
            setOptions(response.data);
            handleClose();
        })
    }

    const isLoggedIn = JSON.parse(localStorage.getItem("loggingUser"));

    const handleSubmitRent = () => {
        if (isLoggedIn) {
            handleShowRentForm();
        } else {
            localStorage.setItem("userId", id);
            navigate("/login");
        }
    };



    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`).then((response) => {
            setUser(response.data);
            setOptions(response.data.options);
            setAddress(response.data.address)
        })
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:8080/api/options`).then((response) => {
            setAllOptions(response.data);
        })
    }, [])


    return (
        <>
            <div className={"partner-info"}>
                <div className={`partner-profile`}>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`cards`}>
                            <div>
                                <a href={`#`}><img src={user.img} alt={``}/></a>
                            </div>
                            <div><p className={"ready"}>Đang sẵn sàng</p></div>
                            <div className={"dob"}><span>Ngày tham gia:</span><span><span>31/5/2019</span></span></div>
                            <hr/>
                        </div>
                        <div className={"info"}>
                            <div className={`d-flex justify-content-between`} id={`inner-info`}>
                                <div>
                                    <h2>{user.nickname}</h2>
                                </div>
                                <div>
                                    <button className={`btn btn-danger`} onClick={handleShow}>
                                        Cập nhật dịch vụ cung cấp
                                    </button>
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
                            {user.price != null &&
                                <h1>{user.price} đ/h</h1>
                            }
                            {user.price == null &&
                                <h1>---</h1>
                            }
                            <div className={`booking`}><a className={"btn btn-danger"} onClick={handleShowRentForm}>THUÊ</a></div>
                            <div><a className={"btn btn-light"}>TẶNG TIỀN</a></div>
                            <div><a className={"btn btn-light"}><i className={"bi bi-chat-square-fill"}></i> CHÁT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showRentForm} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thông tin thuê</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className={"mb-3"}>
                            <label htmlFor={"rent-name"} className={"form-label"}>Tên người cho
                                thuê</label>
                            <Typography variant="h3" color="cyan" textGradient>
                                {user.nickname}
                            </Typography>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"rent-start"} className={"form-label"}>Thời gian bắt đầu
                                thuê</label>
                            <input type={"datetime-local"} className={"form-control"}
                                   id={"rent-start"} name={"rent-start"} required/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"rent-end"} className={"form-label"}>Thời gian kết thúc
                                thuê</label>
                            <input type={"datetime-local"} className={"form-control"}
                                   id={"rent-end"} name={"rent-end"} required/>
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"rent-price"} className={"form-label"}>Giá</label>
                            <Typography variant="h3" color="cyan" textGradient>
                                {user.price} đ/h
                            </Typography>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmitRent} className={"btn btn-danger"}>Thuê</button>
                    <button className={"btn btn-light"} onClick={handleCloseRentForm}>Đóng</button>
                </Modal.Footer>
            </Modal>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật dịch vụ cung cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allOptions.map(item =>
                        <div className={"form-check form-switch"} key={item.id}>
                            <input className={"form-check-input"} type={"checkbox"} id={item.id}
                                   checked={newOptions.includes(item.id)}
                                   onChange={() => handleCheck(item.id)}/>
                            <label className={"form-check-label"} htmlFor={item.id}>{item.name}</label>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleSubmit} className={"btn btn-danger"}>Cập nhật</button>
                    <button className={"btn btn-light"} onClick={handleClose}>Đóng</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}