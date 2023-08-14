import React, {useEffect, useState} from "react";
import "./Search.css";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

const SearchLogin = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");

    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users/search?username=${name}`).then((response) => {
            setAllUsers(response.data);
        });
    };
    useEffect(() => {
        getUsers();
    }, [name]);

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allUsers.length > 0 ? allUsers.slice(startIndex, endIndex) : [];
    };

    return (
        <div>
            {allUsers.length > 0 && (
                <>
                    {getCurrentPageItems().map((user) => (
                        <div key={user.id} className={"mt-2"}>
                            <div className="container-fluid user__page false">
                                <div className="user__page--info media" id={"page_info"}>
                                    <Link to={`/user/${user.id}`}>
                                        <div className="media-left">
                                            {user.img && <img src={user.img} className="media-object" alt="PD"/>}

                                        </div>
                                        <div className="media-body">
                                            <h5 className="media-heading">
                                                <a href="">{user.username}</a>
                                            </h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="page_account">
                        {Array.from(
                            {length: Math.ceil(allUsers.length / itemsPerPage)},
                            (_, index) => index + 1
                        ).map((page) => (
                            <p
                                key={page}
                                className={currentPage === page ? "active" : ""}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchLogin;
