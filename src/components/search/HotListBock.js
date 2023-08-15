import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function HotListBock({selectedUserId}) {
    const [topRenters, setTopRenters] = useState([]);
    const{id} = useParams();

    useEffect((id) => {
        axios.get(`http://localhost:8080/api/ccdv/top3-renters/${id}`)
            .then(response => {
                setTopRenters(response.data);
            })
            .catch(error => {
                console.error("Error fetching top renters:", error);
            });
    }, [id]);

    return (
            <div className="suggest-user">
                <h4>Danh sách hot</h4>
                <div className="suggest-user-item">
                    {topRenters.map(renter => (
                        <div key={renter.bookedUserId} className="avt avt-md">
                            <img className="avt-img" src={renter.bookingUser.img} alt={renter.bookingUser.username} />
                            <p className="user-name">
                                <span>{renter.bookingUser.username}</span>
                                <span>Người thuê: {renter.bookingCount} lần</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    );
}
