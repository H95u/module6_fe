import React, {useState, useEffect} from "react";
import axios from "axios";

const Top3Renters = ({ selectedUserId }) => {
    const [top3Renters, setTop3Renters] = useState([]);
    ;
    useEffect(()=>{
            const fetchTop3Renters = () => {
                axios
                    .get(`http://localhost:8080/api/ccdv/top3-renters`, {
                        params: {
                            ccdvId: selectedUserId,
                        },
                    })
                    .then((response) => {
                        setTop3Renters(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching top 3 renters:", error);
                    });
            };

            fetchTop3Renters();
    }, [selectedUserId]);

    return (
        <div>
            <h1>Top 3 renters</h1>
            {top3Renters.length === 0 ? (
                <p>No renters found.</p>
            ) : (
                <ul>
                    {top3Renters.map((renter) => (
                        <li key={renter.id}>{renter.username}</li>
                    ))}
                </ul>
            )}
        </div>

    );
};
export default Top3Renters;