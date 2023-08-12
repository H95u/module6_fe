import React, {useEffect, useState} from "react";
import axios from "axios";
import "./SidebarTop3.css";
import MenuBar from "../user-info/MenuBar";
import {Typography, Spinner} from "@material-tailwind/react";
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
                    })
                    .catch((error) => {
                        console.log("Error fetching top 3 recent renters:", error);
                    });
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchRecentRenters();
    }, [selectedUserId]);

    const getGenderString = (gender) => {
        return gender === 1 ? "Nam" : "Nữ";
    };
    return (
        <>

            <Typography
                variant="h4"
                color="red"
                className="mb-8 mt-4 text-center"
                textGradient
            >
                Top 3 người thuê gần nhất
            </Typography>
            {top3RecentRenters.length > 0 ? top3RecentRenters.map((renter) => {
                const endTimes = new Date(renter.endTime);
                const currentTime = new Date();
                const duration = Math.floor(
                    (endTimes - currentTime) / (1000 * 60 * 60)
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
                                        <img
                                            src={renter.bookingUser.img}
                                            className="h-10 w-10 mt-2 rounded-full"
                                            alt="PD"
                                        />

                                    </div>
                                    <div className="media-body">
                                        <h5 className="media-heading">
                                            {renter.bookingUser.username}
                                            <span> · {renter.bookingUser.nickname}</span>
                                            <span> · {getGenderString(renter.bookingUser.gender)}</span>
                                        </h5>
                                        <p className="media-last-time">
                                            <span className={`status-stop ${statusColor}`}></span>
                                        </p>
                                        <p className="media-rentals">
                                            Người thuê gần
                                            nhất: {new Date(renter.endTime).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour24: true + "PM"
                                        })}
                                        </p>
                                        <span>{duration} giờ trước</span>
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
            }) : ""
            }
        </>
    );
};

export default Top3RecentRenters;