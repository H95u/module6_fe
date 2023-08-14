import {useState} from "react";
import axios from "axios";

const SearchLogin = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() !== "") {
            axios
                .get(`http://localhost:8080/api/users/search?username=${query}`)
                .then((response) => {
                    setSuggestions(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching suggestions: ", error);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSearchQuery("");
        setSuggestions([]);
        setAllUsers([]);
    };

    const handleShowAll = () => {
        setAllUsers(suggestions);
        setSuggestions([]);
        setSelectedUser(null);
        setSearchQuery("");

    };

    const handleClear = () => {
        setSelectedUser(null);
        setSearchQuery("");
        setSuggestions([]);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            setSearchQuery("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allUsers.slice(startIndex, endIndex);
    };



    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Autocomplete search 🔎</h1>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleChange}
                            placeholder="Search by username"
                        />
                        <button type="button" onClick={handleClear}>
                            Clear
                        </button>
                        <button type="submit">
                            Search
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <div className="suggestions">
                            {suggestions.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="selectedUser"
                                            checked={selectedUser === user}
                                            readOnly
                                        />
                                        {user.username}
                                    </label>
                                </div>
                            ))}
                            <button type="button" onClick={handleShowAll}>
                                Show All
                            </button>
                        </div>
                    )}
                </form>
            </div>
            {allUsers.length > 0 && (
                <>
                    {getCurrentPageItems().map((user) => (
                        <div key={user.id} onClick={() => handleUserClick(user)}>
                            <div className="container-fluid user__page false">
                                <div className="user__page--info media" id={"page_info"}>
                                    <div className="media-left">
                                        <a href="/daurautranuoc">
                                            {user.img && <img src={user.img} className="media-object" alt="PD" />}
                                        </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="media-heading">
                                            <a href="">{user.username}</a>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="page_account">
                        {Array.from(
                            { length: Math.ceil(allUsers.length / itemsPerPage) },
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
        </>
    );

};

export default SearchLogin;