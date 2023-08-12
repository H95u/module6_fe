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
                        console.log(response.data)
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
        <>
            <div className="mx-auto">
                <Typography
                    variant="h4"
                    color="red"
                    className="mb-8 mt-4 text-center"
                    textGradient
                >Top 3 người thuê nhiều nhất
                </Typography>
                {top3Renters.length > 0 ? top3Renters.map((renter) => {
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
                                                    {renter.bookingUser.username}
                                                    <span> · {renter.bookingUser.nickname}</span>
                                                    <span> · {getGenderString(renter.bookingUser.gender)}</span>
                                                </h5>
                                                <p className="media-last-time">

                                                    <span>{duration} giờ trước</span>
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
                        </Link>
                    );
                }) : ""
                }
            </div>
        </>
    );
}

export default Top3Renters;