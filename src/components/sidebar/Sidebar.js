import React from 'react';
import "./Sidebar.css"

export default function Sidebar () {
    return(
        <>
            <div className={"home-flex-category"}>
                <div className={"fixed-case"}>
                    <p>
                        <span className={"list-name font-bold text-danger"}>Danh mục dịch vụ</span>
                    </p>
                    <ul className={"list-group"}>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Ra mắt người nhà</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Ra mắt bạn bè</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Du lịch chung cùng nhóm bạn</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Đi chơi chung</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Tham dự sinh nhật</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Trò chuyện offline</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Trò chuyện online</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Đi chơi tết</p>
                                </div>
                            </div>
                        </li>
                        <li className={"list-item"}>
                            <div className={"media"}>
                                <div className={"media-body media-middle"}>
                                    <p>Đi chơi ngày lễ</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}