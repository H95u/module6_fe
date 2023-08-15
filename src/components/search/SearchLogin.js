import React, {useEffect, useState} from "react";
import "./Search.css";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import {Button, IconButton, Card, List, ListItem, ListItemPrefix, Avatar, Typography} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import MenuBar from "../user-info/MenuBar";



const SearchLogin = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");

    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users/search?username=${name}`).then((response) => {
            setAllUsers(response.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, [name]);

    const itemsPage = 5;
    const startIndex = (currentPage - 1) * itemsPage;
    const visibleSearchAll = allUsers.slice(startIndex, startIndex + itemsPage);
    const pageCount = Math.ceil(allUsers.length / itemsPage);

    const next = () => {
        if (currentPage === pageCount) return;
        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={"col-md-6 container-fluid user__page false"}>
                {allUsers.length > 0 && (
                    <div className={"list-item-username"}>
                        {visibleSearchAll.map((user) => (
                            <Card key={user.id} className="w-96 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
                                <List>
                                    <ListItem>
                                        <ListItemPrefix>
                                            {user.img &&
                                                <Avatar variant="circular" alt={user.username} src={user.img}/>}
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" color="pink">
                                                <Link to={`/user/${user.id}`}>{user.username}</Link>
                                            </Typography>
                                        </div>
                                    </ListItem>
                                </List>
                            </Card>
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-center gap-2 paging-buttons">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(pageCount)].map((_, index) => (
                            <IconButton
                                key={index + 1}
                                variant={currentPage === index + 1 ? "filled" : "text"}
                                color="pink"
                                onClick={() => setCurrentPage(index + 1)}
                                className="rounded-full"
                            >
                                {index + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={currentPage === pageCount}
                    >
                        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchLogin;
