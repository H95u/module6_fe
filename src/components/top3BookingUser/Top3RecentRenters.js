import React, {useEffect, useState} from "react";
import axios from "axios";
import SidebarTop3 from "./SidebarTop3";
import "./SidebarTop3.css"

const Top3RecentRenters = ({selectedUserId}) => {
    const [top3RecentRenters, setTop3RecentRenters] = useState([]);
    useEffect(() => {
        const fetchRecentRenters = () => {
            try {
                axios.get("http://localhost:8080/api/ccdv/top3-recent-renters", {
                    params: {
                        bookedUserId: selectedUserId
                    }
                })
                    .then((response) => {
                        setTop3RecentRenters(response.data);
                    })
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchRecentRenters();
    }, [selectedUserId]);

    // <div>
    //     <h1>Top 3 Recent Renters</h1>
    //     {top3RecentRenters.length === 0 ? (
    //         <p>No renters found.</p>
    //     ) : (
    //         <ul>
    //             {top3RecentRenters.map((recent) => (
    //                 <li key={recent.id}>{recent.username}</li>
    //             ))}
    //         </ul>
    //     )}
    // </div>

    return (
        <>
            <div className="row">
            <div className="">
                <SidebarTop3/>
            </div>
                <div className="col-md-5 p-0">
                    <div className="row m-0">
                        <div className="col-md-6 p-0">
                            <div className={`information`}>
                                <div className="user__follow--main">
                                    <div className="user__follow--btn">
                                        <div>
                                            <span>Trang</span>
                                        </div>
                                        <div>album</div>
                                        <div className="active">Player</div>
                                    </div>
                                </div>
                                <div className="user__action--introduce">
                                    <div className="container-fluid user__player false">
                                        <div className="user__page--info media">
                                            <div className="media-left">
                                                <a
                                                    href="/meowmeow3k"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="https://playerduo.net/api/upload-service/images/1d1fa3b4-fe53-4a76-983e-6e1470f79367__a3292fd0-30ea-11ee-a657-a54d6be1d46a__player_avatar.jpg"
                                                        className="media-object"
                                                        alt="PD"
                                                    />
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <h5 className="media-heading">
                                                    <a
                                                        href="/meowmeow3k"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        MÈO 3K 🍑<span> · biết điều hehe</span>
                                                    </a>
                                                </h5>
                                                <p className="media-last-time">
                                                    <a
                                                        href="/meowmeow3k"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>40 phút trước</span> ·
                                                        <span className="status-ready">
                                                <span>Đang sẵn sàng</span>
                                            </span>
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="media-right">
                                                <button className="btn btn-default">
                                                    <i className="fas fa-minus-circle"></i>{" "}
                                                    <span>Hủy theo dõi</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Top3RecentRenters;