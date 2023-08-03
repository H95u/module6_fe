import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./partnerprofile.css";

export default function PartnerInfo() {
    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    const [address, setAddress] = useState("");
    const {id} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`).then((response) => {
            setUser(response.data);
            setOptions(response.data.options);
            setAddress(response.data.address)
        })
    }, [])

    return (
        <div className={"partner-info"}>
            <div className={`partner-profile`}>
                <div className={`d-flex justify-content-center`}>
<<<<<<< HEAD
                    <div className={`title`}>
=======
                    <div className={`cards`}>
>>>>>>> 9ceb10723698c40c4dd4692fe207328c9849c83d
                        <div>
                            <a href={`#`}><img src={user.img} alt={``}/></a>
                        </div>
                        <div><p className={"ready"}>Đang sẵn sàng</p></div>
                        <div className={"dob"}><span>Ngày tham gia:</span><span><span>31/5/2019</span></span></div>
                        <hr/>
                    </div>
                    <div className={"info"}>
                        <div className={`row`} id={`inner-info`}>
                            <div className={"col-lg-8"}>
                                <h2>{user.nickname}</h2>
                            </div>
                            <div className={"col-lg-4"}>
                                <button><i className={"bi bi-heart"}></i> Theo dõi</button>
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
                                    <div className={`service-name`}>
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
                        <h1>80.000đ/h</h1>
                        <div className={`booking`}><a className={"btn btn-danger"}>THUÊ</a></div>
                        <div><a className={"btn btn-light"}>TẶNG TIỀN</a></div>
                        <div><a className={"btn btn-light"}><i className={"bi bi-chat-square-fill"}></i> CHÁT</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}