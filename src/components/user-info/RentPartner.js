import React from "react";

export default function RentPartner () {

    return(
        <>
            <div className={"action"}>
                <h1>80.000đ/h</h1>
                <div className={`booking`}><a className={"btn btn-danger"} data-bs-toggle={"modal"} data-bs-target={"#rentModal"}>THUÊ</a></div>
                <div><a className={"btn btn-light"}>TẶNG TIỀN</a></div>
                <div><a className={"btn btn-light"}><i className={"bi bi-chat-square-fill"}></i> CHÁT</a>
                </div>
            </div>

            <div className={"modal fade"} id={"rentModal"} tabIndex="-1" aria-labelledby={"rentModalLabel"} aria-hidden={"true"}>
                <div className={"modal-dialog"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <h5 className={"modal-title"} id={"rentModalLabel"}>Thông tin thuê</h5>
                            <button className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
                        </div>
                        <div className={"modal-body"}>
                            <form>
                                <div className={"mb-3"}>
                                    <label htmlFor={"rent-name"} className={"form-label"}>Tên người cho thuê</label>
                                    <h2>{user.nickname}</h2>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"rent-start"} className={"form-label"}>Thời gian bắt đầu thuê</label>
                                    <input type={"datetime-local"} className={"form-control"} id={"rent-start"} name={"rent-start"} required/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"rent-end"} className={"form-label"}>Thời gian kết thúc thuê</label>
                                    <input type={"datetime-local"} className={"form-control"} id={"rent-end"} name={"rent-end"} required/>
                                </div>
                                <div className={"mb-3"}>
                                    <label htmlFor={"rent-price"} className={"form-label"}>Giá</label>
                                    <input type={"text"} className={"form-control"} id={"rent-price"} name={"rent-price"} required/>
                                </div>
                            </form>
                        </div>
                        <div className={"modal-footer"}>
                            <button className={"btn btn-secondary"} data-bs-dismiss={"modal"}>Đóng</button>
                            {/*<button className={"btn btn-primary"} onClick={}>Xác nhận thuê</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}