import React, {useState, useEffect} from "react";
import axios from "axios";

const Top3RecentRenters = ({selectedUserId}) => {
    const [top3RecentRenters, setTop3RecentRenters] = useState([]);
    useEffect(() => {
        const fetchRecentRenters = () => {
            try {
                axios.get(
                    "http://localhost:8080/api/ccdv/top3-recent-renters",{
                        params:{
                            bookedUserId:selectedUserId
                        }
                    })
                    .then((response) => {
                        setTop3RecentRenters(response.data);
                    })
            } catch (error) {
                console.log("Error fetching top 3 recent renters:", error);
            }
        };

        fetchRecentRenters();
    }, [selectedUserId]);


    return (
        <div>
            <h1>Top 3 Recent Renters</h1>
            {top3RecentRenters.length === 0 ? (
                <p>No renters found.</p>
            ) : (
                <ul>
                    {top3RecentRenters.map((recent) => (
                        <li key={recent.id}>{recent.username}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Top3RecentRenters;