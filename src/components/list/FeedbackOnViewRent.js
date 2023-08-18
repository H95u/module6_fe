import React, {useState} from "react";
import {useParams} from "react-router-dom";
import FeedbackService from "../../services/feedback.service";
import {Button, IconButton, Popover, PopoverContent, PopoverHandler, Rating, Tooltip} from "@material-tailwind/react";
import {BugAntIcon, NewspaperIcon} from "@heroicons/react/20/solid";
import Modal from "react-bootstrap/Modal";
import {Form, Formik} from "formik";
import Swal from "sweetalert2";

export default function FeedbackOnViewRent(props) {
    const isLoggedIn = JSON.parse(localStorage.getItem("loggingUser"));
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [showReport, setShowRePort] = useState(false);
    const [showFeedback, setFeedback] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const [tooltipVisible, setTooltipVisible] = useState(false);


    const {id} = useParams();

    const handleOpenFeedbackModal = () => {
        setFeedback(true);
    }

    const handleCLoseFeedbackModal = () => {
        setFeedback(false);
    }
    const handlePopoverClick = () => {
        setTooltipVisible(true);
    };

    const handlePopoverMouseLeave = () => {
        setTooltipVisible(false);
    };

    const handleOpenReportModal = () => {
        setShowRePort(true);
    }


    const handleSubmitFeedback = () => {
        if (isLoggedIn) {
            console.log("Receiver ID:", id);
            const feedback = {
                message: message,
                rating: rating,
                sender: {
                    id: isLoggedIn.id
                },
                receiver: {
                    id: props.receiverId
                }

            }
            console.log("Sending feedback:", feedback);
            FeedbackService.createFeedBack(feedback)
                .then((response) => {
                    setMessage("");
                    setRating(0);
                    setFeedbacks([response.data, ...feedbacks]);
                    Swal.fire({
                        title: "Gửi feeback thành công!",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                    setFeedback(false);
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi phản hồi:", error);
                });
        }
    }


    const handleTextareaKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmitFeedback();
            handleCLoseFeedbackModal();
        }
    };


    return (
        <>
            <Popover placement="bottom">
                <PopoverHandler>
                    <i
                        className="bi bi-three-dots icon-hover"
                        onClick={handlePopoverClick}
                        onMouseLeave={handlePopoverMouseLeave}
                    ></i>
                </PopoverHandler>
                <PopoverContent style={{display: "flex"}}>
                    <Tooltip content="Đánh giá" show={tooltipVisible}>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={handleOpenFeedbackModal}
                        >
                            <NewspaperIcon className="h-4 w-4"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Báo cáo" show={tooltipVisible}>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={handleOpenReportModal}
                        >
                            <BugAntIcon className="h-4 w-4"/>
                        </IconButton>
                    </Tooltip>
                </PopoverContent>
            </Popover>
            <Modal show={showFeedback} onHide={handleCLoseFeedbackModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={{
                        rating: 0,
                        message: ""
                    }}
                            onSubmit={handleSubmitFeedback}
                            enableReinitialize={true}>
                        <Form>
                            <div className="feedback-form">
                                <div className="rating-input">
                                    <Rating value={rating} onChange={(value) => setRating(value)}/>
                                </div>
                                <textarea
                                    placeholder="Feedback..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleTextareaKeyDown}
                                />
                            </div>
                            <div className="modal-footer">
                                <Button color={"orange"} type={"submit"} onClick={handleCLoseFeedbackModal}>
                                    Gửi
                                </Button>
                                <Button onClick={handleCLoseFeedbackModal}>
                                    Quay lại
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}