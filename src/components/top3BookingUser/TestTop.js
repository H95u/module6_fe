import {useEffect, useState} from "react";
import axios from "axios";
import "./test-top.css"

export default function TestTop() {
    const [top3Renters, setTop3Renters] = useState([]);

    useEffect(() => {
        const fetchTop3Renters = () => {
            try {
                axios
                    .get(`http://localhost:8080/api/ccdv/top3-renters`, {
                        params: {
                            ccdvId: 27,
                        },
                    })
                    .then((response) => {
                        console.log(response.data)
                        setTop3Renters(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching top 3 renters:", error);

                    });
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchTop3Renters();
    }, []);

    return (
        <div className="leaderboard-container">
            <ul className="ranking-list">
                {top3Renters.map((person, index) => (
                    <li key={person.bookingUser.username} className="ranking-item">
                    <span className="ranking-position">
                        {index === 0 ? <i className="bi bi-1-square"></i> : null}
                        {index === 1 ? <i className="bi bi-2-square"></i> : null}
                        {index === 2 ? <i className="bi bi-3-square"></i> : null}
                    </span>
                        <img className="h-10 w-10 rounded-full" src={person.bookingUser.img} alt="Avatar"/>
                        <span className="ranking-name">{person.bookingUser.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

}