import React, {useEffect, useState} from "react";
import axios from "axios";
import "./SidebarTop3.css";
import MenuBar from "../user-info/MenuBar";
import {Typography} from "@material-tailwind/react";
import "./Top3.css"

const Top3RecentRenters = ({selectedUserId}) => {
    const [top3RecentRenters, setTop3RecentRenters] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRecentRenters = () => {
            try {
                axios
                    .get("http://localhost:8080/api/ccdv/top3-recent-renters", {
                        params: {
                            bookedUserId: selectedUserId,
                        },
                    })
                    .then((response) => {
                        setTop3RecentRenters(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log("Error fetching top 3 recent renters:", error);
                        setLoading(false);
                    });
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchRecentRenters();
    }, [selectedUserId]);
    if (loading) {
        return <p>Loading...</p>;
    }
    const getGenderString = (gender) => {
        return gender === 1 ? "Nam" : "Nữ";
    };
    return (
        <>
            <div className="container-view">
                <div className="row">
                    <MenuBar />
                    <div className="col-lg-9">
                        <Typography
                            variant="h4"
                            color="red"
                            className="mb-8 mt-4 text-center"
                            id={"top3_recent"}
                            textGradient
                        >
                            Top 3 người thuê ngần nhất
                        </Typography>
                        {top3RecentRenters.map((renter) => {
                            const endTimes = new Date(renter.endTime);
                            const currentTime = new Date();
                            const duration = Math.floor(
                                (currentTime - endTimes) / (1000 * 60 * 60)
                            );

                            let statusColor = "";
                            if (renter.status === "1") {
                                statusColor = "text-green-500";
                            } else if (renter.status === "0") {
                                statusColor = "text-red-500";
                            }

                            return (
                                <div
                                    className="group-main-wrap col-md-6"
                                    key={renter.id}
                                >
                                    <div className="user__action--introduce">
                                        <div className="container-fluid user__player false">
                                            <div className="user__page--info media">
                                                <div className="media-left">
                                                    <a
                                                        href={""}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={renter.bookedUserId.img}
                                                            className="media-object"
                                                            alt="PD"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="media-heading">
                                                        <a
                                                            href={""}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {renter.bookingUser.username}
                                                            <span> · {renter.bookingUser.nickname}</span>
                                                            <span> · {getGenderString(renter.bookingUser.gender)}</span>
                                                        </a>
                                                    </h5>
                                                    <p className="media-last-time">
                                                        <a
                                                            href={""}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <span>{duration} giờ trước</span> ·
                                                            <span className={`status-stop ${statusColor}`}>
                                <span>
                                  {renter.bookingUser.status === "1"
                                      ? "Online"
                                      : "Ngừng hoạt động"}
                                </span>
                              </span>
                                                        </a>
                                                    </p>
                                                    <p className="media-rentals">
                                                        Người thuê gần nhất: {new Date(renter.endTime).toLocaleString(undefined, {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour24: true + "PM"
                                                    })}

                                                    </p>
                                                </div>
                                                <div className="media-right">
                                                    <button
                                                        className="btn btn-default"
                                                        fdprocessedid={""}
                                                    >
                                                        <i className="fas fa-minus-circle"></i>{" "}
                                                        <span>Hủy theo dõi</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Top3RecentRenters;