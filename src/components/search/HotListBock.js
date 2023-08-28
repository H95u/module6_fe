import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function HotListBock({selectedUserId}) {
    const [topRenters, setTopRenters] = useState([]);
    const {id} = useParams();
    const maxList = 10;

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/sort-by-rent-count-desc')
            .then(response => {
                setTopRenters(response.data.slice(0,maxList));

            })
            .catch(error => {
                console.error(":", error);
            });
    }, [id]);

    return (
        <div className={"col-md-3 left-rank hidden-sm hidden-xs"}>
            <div className="suggest-user">
                <h4>Danh sách hot</h4>
                <div className="suggest-user-item ml-10">
                    {topRenters.map(user => (
                        <Link to={`/user/${user.id}`}>
                        <div className="avt avt-md mb-3">
                            <img className="avt-img" src={user.img} alt={user.username}/>
                            <p className="user-name font-bold">
                                <span>{user.username}</span>
                                <span>Người thuê: {user.rentCount} lần</span>
                            </p>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
