import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuBar from "../user-info/MenuBar";
import { Typography } from "@material-tailwind/react";
import "./Top3.css";

const Top3Renters = ({ selectedUserId }) => {
    const [top3Renters, setTop3Renters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTop3Renters = () => {
            try {
                axios
                    .get(`http://localhost:8080/api/ccdv/top3-renters`, {
                        params: {
                            ccdvId: selectedUserId,
                        },
                    })
                    .then((response) => {
                        setTop3Renters(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching top 3 renters:", error);
                        setLoading(false);
                    });
            }catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchTop3Renters();
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
                            id={"top3_renter"}
                            className="mb-8 mt-4 text-center"
                            textGradient
                        >Top 3 người thuê nhiều nhất
                        </Typography>
                        {top3Renters.map((renter) => {
                            const endTime = new Date(renter.endTime);
                            const currentTime = new Date();
                            const duration = Math.floor(
                                (currentTime - endTime) / (1000 * 60 * 60)
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
                                  {renter.status === "1"
                                      ? "Online"
                                      : "Ngừng hoạt động"}
                                </span>
                              </span>
                                                        </a>
                                                    </p>
                                                    <p className="media-rentals">
                                                        Số lần thuê: {renter.bookingCount}
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

export default Top3Renters;