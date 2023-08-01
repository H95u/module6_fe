import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Content() {
    const [users, setUsers] = useState([]);
    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`)
            .then((response) => {
                setUsers(response.data);
            })

    };

    useEffect(() =>
        getUsers(), []
    )

    return (
        <div className={"container"}>
            <div className={"row"}>
                {users.map(item => (
                    <div className={"col-lg-3"}>
                        <Link to={`/user/${item.id}`}>
                            <div className="card" style={{width: "18rem"}}>
                                <img style={{height: "250px"}} src={item.img} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{item.username}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and
                                        make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}