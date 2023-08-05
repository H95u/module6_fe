import {useState} from "react";
import Filter from "./Filter";

export default function Test() {
    const [users, setUsers] = useState(
        [
            {
                id: 1,
                name: 'hieu',
            },
            {
                id: 2,
                name: 'lam',
            },
            {
                id: 3,
                name: 'minh',
            },

        ]
    )

    const searchHandle = (searchKeyword) => {
        // Implement your search logic here using the searchKeyword
        // For example, filter the users based on the searchKeyword
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setUsers(filteredUsers);
    };


    return (
        <>
            <Filter onSearch={searchHandle}/>
            {users.map(item => (
                <h1>
                    {item.name}
                </h1>
            ))}
        </>

    )
}