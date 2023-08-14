import React, {useEffect, useState} from "react";
import "./Search.css";

const SearchLogin = (props) => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    console.log(props.suggestions)
    useEffect(() => {
        setAllUsers(props.suggestions);
    }, [props.suggestions]);

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allUsers.length > 0 ? allUsers.slice(startIndex, endIndex) : [];
    };

    return (
        <div className={"see-all-container"}>
            {allUsers.length > 0 && (
                <>
                    {getCurrentPageItems().map((user) => (
                        <div key={user.id}>
                            {/* JSX của mỗi user */}
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
