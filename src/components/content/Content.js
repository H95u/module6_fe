import {useEffect, useState} from "react";
import axios from "axios";

export default function Content() {
    const [users, setUsers] = useState([]);
    const getUsers = () => {
        axios.get(`http://localhost:8080/api/user-info`)
            .then((response) => {
                setUsers(response.data);
            })

    };

    useEffect(() =>
        getUsers(), []
    )


    return (
        <>
            <h1>Content</h1>
        </>
    )
}