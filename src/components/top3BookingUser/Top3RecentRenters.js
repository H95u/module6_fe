import React, {useEffect, useState} from "react";
import axios from "axios";
import {Typography, Spinner} from "@material-tailwind/react";
import "./Top3.css"
import {Link} from "react-router-dom";

const Top3RecentRenters = ({selectedUserId}) => {
    const [top3RecentRenters, setTop3RecentRenters] = useState([]);
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
            <div className={"over-rank"}>
                <Typography
                    variant="h4"
                    color="red"
                    className="mb-8 mt-4 text-center"
                    textGradient
                >
                    Top 3 đơn thuê gần nhất
                </Typography>
                {top3RecentRenters.length > 0 ? top3RecentRenters.map((renter, index) => {

                    let statusColor = "";
                    if (renter.status === "1") {
                        statusColor = "text-green-500";
                    } else if (renter.status === "0") {
                        statusColor = "text-red-500";
                    }

                    return (
                        <Link to={`/user/${renter.bookingUser.id}`}>
                            <div
                                className="group-main-wrap col-md-6"
                                key={renter.id}
                            >
                                <div className="user__action--introduce">
                                    <div className="container-fluid user__player false">
                                <span className="ranking-position">
                                           {index === 0 ? <img  style={{width: 38, height: 38}} src="/banner/top1.png" alt=""/> : null}
                                    {index === 1 ? <img  style={{width: 38, height: 38}} src="/banner/silver.png" alt=""/> : null}
                                    {index === 2 ? <img  style={{width: 38, height: 38}} src="/banner/bronze.png" alt=""/> : null}
                                      </span>
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
                                                    <span>
                                            <a
                                                href={""}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Tên: {renter.bookingUser.username}
                                            </a>
                                        </span>
                                                </h5>
                                                <p className="media-heading">
                                                    Biệt danh: {renter.bookingUser.nickname}
                                                </p>
                                                <p className="media-heading">
                                                    Giới tính: {getGenderString(renter.bookingUser.gender)}
                                                </p>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                }) : ""
                }
            </div>
        </>
    );
};

export default Top3RecentRenters;