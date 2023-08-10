import React, {useEffect, useState} from "react";
import "./Feedback.css"
import axios from "axios";
import {Rating} from "@material-tailwind/react";
import {useParams} from "react-router-dom";


export default function Feedback() {
    const isLoggedIn = JSON.parse(localStorage.getItem("loggingUser"));
    const [feedbacks, setFeedbacks] = useState([]);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0)
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/feedbacks/receiver/${id}`)
            .then(response => {
                setFeedbacks(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi tìm nạp phản hồi:', error);
            });
    }, []);

    // const handleSubmitFeedback = () => {
    //     if (isLoggedIn) {
    //         const feedback = {
    //             message: message,
    //             rating: rating,
    //             sender: {
    //                 id: isLoggedIn.id
    //             },
    //             receiver: {
    //                 id: +id
    //             }
    //         }
    //         console.log(feedback)
    //         axios.post(`http://localhost:8080/api/feedbacks/create`, feedback)
    //             .then((response) => {
    //
    //             })
    //     }
    // }
    return (
        <>
            <div className={"title-player-profile row"}>
                <div className={"col-xs-6"}>
                    <span>Đánh giá</span>
                </div>
            </div>
            {feedbacks.map((feedback, index) =>
                <div key={index} className={"text-center review-duo-player row"}>
                    <div className={"col-md-12"}>
                        <div className={"full-size"}>
                            <div className={"review-image-small"}>
                                <div className={"avt-rank avt-md"}>
                                    <img className={"avt-1-15 avt-img"} src={feedback.sender.img} alt="rankNo"/>
                                </div>
                            </div>
                            <div className={"wrapper-content-rating"}>
                                <div className={"review-content"}>
                                    <a href="">
                                        <p>{feedback.sender.username}</p>
                                    </a>
                                    <p className={"time-player-review"}>
                                    <span>{new Date(feedback.presentTime).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}</span>
                                    </p>
                                </div>
                                <p className={"content-player-review"}>{feedback.message}</p>
                            </div>
                        </div>
                        <div className={"review-rating"}>
                            <div className={"rating-style"}>
                                <Rating value={feedback.rating} readonly/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}