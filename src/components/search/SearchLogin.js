import { useState } from "react";
import axios from "axios";

const SearchLogin = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

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

    return (
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
            <div>
                {allUsers.map((user) => (
                    <div key={user.id} onClick={() => handleUserClick(user)}>
                        <h2>{user.username}</h2>
                        <p>UserName: {user.username}</p>
                        {user.img && <img src={user.img} alt="User Avatar" />}
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div>
                    <h2>{selectedUser.username}</h2>
                    <p>UserName: {selectedUser.username}</p>
                    {selectedUser.img && <img src={selectedUser.img} alt="User Avatar" />}
                </div>
            )}
        </div>
    );

};

export default SearchLogin;