import React, { useEffect, useState } from "react";
import stompClient from "../../config/socket";
import axios from "axios";
import {Popover, PopoverContent, PopoverHandler} from "@material-tailwind/react";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Message() {
    const navigate = useNavigate();

    const getChat = () => {
      navigate("/chat")
    }

    return (
        <>
            <img onClick={getChat} id="chat-icon" src="/chat.png" alt="chat"/>
        </>
    );
}
