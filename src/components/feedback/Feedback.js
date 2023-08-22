import React, {useEffect, useState} from "react";
import "./Feedback.css"
import {Rating, Button, IconButton} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import FeedbackService from "../../services/feedback.service";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";


export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [active, setActive] = React.useState(1);

    const {id} = useParams();

    useEffect(() => {
        FeedbackService.getFeedbackByReceiverId(id)
            .then(response => {
                const sortedFeedbacks = response.data.sort((a, b) => {
                    return new Date(b.presentTime) - new Date(a.presentTime);
                });
                setFeedbacks(response.data);
                setFeedbacks(sortedFeedbacks);
            })
            .catch(error => {
                console.error('Lỗi khi tìm nạp phản hồi:', error);
            });
    }, []);


    const itemsPerPage = 5;
    const startIndex = (active - 1) * itemsPerPage;
    const visibleFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);
    const pageCount = Math.ceil(feedbacks.length / itemsPerPage);

    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "pink",
            onClick: () => setActive(index),
            className: "rounded-full",
        });

    const next = () => {
        if (active === pageCount) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <>
            <div className={"title-player-profile row"}>
                <div className={"col-xs-6"}>
                    <span>Đánh giá</span>
                </div>
            </div>

            {visibleFeedbacks.map((feedback, index) =>
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
                                    <p>{feedback.sender.username}</p>
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
                                    <p className={"content-player-review"}>{feedback.message}</p>
                                </div>
                                <div className={"review-rating"}>
                                    <div className={"rating-style"}>
                                        <Rating value={feedback.rating} readonly/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {feedbacks.length > 0 ? <div className="flex items-center justify-center gap-2 paging-buttons">
                <div className="flex items-center gap-4">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(pageCount)].map((_, index) => (
                            <IconButton key={index + 1} {...getItemProps(index + 1)}>
                                {index + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={active === pageCount}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                    </Button>
                </div>
            </div> : ""}

        </>
    )
}