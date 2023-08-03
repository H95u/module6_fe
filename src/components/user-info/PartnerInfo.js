import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./partnerprofile.css";

export default function PartnerInfo() {
    const [user, setUser] = useState({});
    const [options, setOptions] = useState([]);
    const [allOptions, setAllOptions] = useState([]);
    const [address, setAddress] = useState("");
    const {id} = useParams();


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
                                    <button className={`btn btn-success`} data-bs-toggle={"modal"}
                                            data-bs-target={"#exampleModal"}>Cập nhật dịch vụ cung cấp
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
                            <div><a className={"btn btn-light"}><i className={"bi bi-chat-square-fill"}></i> CHÁT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={"modal fade"} id={"exampleModal"} tabIndex="-1" aria-labelledby={"exampleModalLabel"}
                 aria-hidden={"true"}>
                <div className={"modal-dialog"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h5 className={"modal-title"} id={"exampleModalLabel"}>Cập nhật dịch vụ cung cấp</h5>
                            <button className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
                        </div>
                        <div className={"modal-body"}>
                            {allOptions.map((items) =>
                                <div className={"form-check form-switch"}>
                                    <input className={"form-check-input"} type={"checkbox"} id={items.id}/>
                                    <label className={"form-check-label"} htmlFor={items.id}>{items.name}</label>
                                </div>
                            )}

                        </div>
                        <div className={"modal-footer"}>
                            <button className={"btn btn-secondary"} data-bs-dismiss={"modal"}>Đóng</button>
                            <button className={"btn btn-primary"}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}