import React, {useEffect, useState} from "react";
import "./Story.css";
import {Typography} from "@material-tailwind/react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Story() {
    const [vipLovers, setVipLovers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/sort-by-view-count-desc').then((response) => {
            setVipLovers(response.data);
        });
    }, []);

    return (
        <>
            <Typography variant="h3" color="red" className="ml-4" textGradient>
               Được quan tâm nhiều nhất
            </Typography>
            <div className="wrapper">
                {vipLovers.map((item, index) => (
                    <div key={index} className="action_box--list">
                        <Link to={`/user/${item.id}`}>
                            <div className={"view-detail"}>
                                <i className="bi bi-eye"></i> &nbsp;
                                <span>{item.viewCount}</span>
                            </div>
                            <div className="box-item">
                                <img src={item.img} alt="PD" id="avt-img-reponsiver"/>
                            </div>
                            <div className="lover-name">
                                <div className="avt-rank avt-sm">
                                    <img src={item.img} alt="PD" className="avt-1-15 avt-img"/>
                                </div>
                                <Typography variant={"h5"} className={"ml-4 mt-2 font-medium"}>
                                    {item.username}
                                </Typography>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </>
    );
}
