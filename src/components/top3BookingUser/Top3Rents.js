import React, {useEffect, useState} from "react";
import axios from "axios";
import MenuBar from "../user-info/MenuBar";
import {Typography} from "@material-tailwind/react";
import "./Top3.css";
import {Link} from "react-router-dom";

const Top3Renters = ({selectedUserId}) => {
    const [top3Renters, setTop3Renters] = useState([]);

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
                    })
                    .catch((error) => {
                        console.error("Error fetching top 3 renters:", error);

                    });
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchTop3Renters();
    }, [selectedUserId]);

    const getGenderString = (gender) => {
        return gender === 1 ? "Nam" : "Nữ";
    };

    return (
        <div className={"leaderboard-container"}>
            <div className="mx-auto">
                <Typography
                    variant="h4"
                    color="red"
                    className="mb-8 mt-4 text-center"
                    textGradient
                >Top 3 người thuê nhiều nhất
                </Typography>
                {top3Renters.length > 0 ? top3Renters.map((renter,index) => {
                    const endTime = new Date(renter.endTime);
                    const currentTime = new Date();
                    const duration = Math.floor(
                        (endTime - currentTime) / (1000 * 60 * 60)
                    );


                    return (
                        <Link to={`/user/${renter.bookingUser.id}`}>
                            <div
                                className="group-main-wrap col-md-6"
                                key={renter.id}
                            >
                                <div className="user__action--introduce">
                                    <div className="container-fluid user__player false">
                                       <span className="ranking-position">
                                           {index === 0 ? <i className="bi bi-1-square"></i> : null}
                                           {index === 1 ? <i className="bi bi-2-square"></i> : null}
                                           {index === 2 ? <i className="bi bi-3-square"></i> : null}
                                      </span>
                                        <div className="user__page--info media">
                                            <div className="media-left">
                                                <img
                                                    src={renter.bookingUser.img}
                                                    className="mt-2 rounded-full h-10 w-10"
                                                    alt="PD"
                                                />
                                            </div>
                                            <div className="media-body">
                                                <h5 className="media-heading">
                                                    <span style={{ color: 'red' }}><h3>Top{++index}</h3></span>
                                                    <span>
                                                        <a
                                                            href={""}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Tên:  {renter.bookingUser.username} &ensp;
                                                            Biệt danh: {renter.bookingUser.nickname} &ensp;
                                                            Giới tính: {getGenderString(renter.bookingUser.gender)} &ensp;
                                                            Địa chỉ: {renter.bookingUser.address.name}
                                                        </a>
                                                        </span>
                                                </h5>
                                                <p className="media-last-time">

                                                    <span>{duration} giờ trước</span>
                                                </p>
                                                <p className="media-rentals">
                                                    Số lần thuê: {renter.bookingCount}
                                                </p>
                                            </div>
                                            {/*<div className="media-right">*/}
                                            {/*    /!*<button*!/*/}
                                            {/*    /!*    className="btn btn-default"*!/*/}
                                            {/*    /!*    fdprocessedid={""}*!/*/}
                                            {/*    /!*>*!/*/}
                                            {/*    /!*    <i className="fas fa-minus-circle"></i>{" "}*!/*/}
                                            {/*    /!*    <span>Hủy theo dõi</span>*!/*/}
                                            {/*    /!*</button>*!/*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                }) : ""
                }
            </div>
        </div>
    );
}

export default Top3Renters;