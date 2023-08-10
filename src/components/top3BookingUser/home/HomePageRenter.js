import React, {useState, useEffect} from "react";
import Top3Rents from "../Top3Rents";

const HomePageRenter = () => {
    const [showTop3Renter, setShowTop3Renter] = useState(true);

    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

    const handleShowTop3Renters = () => {

        setShowTop3Renter(false);
    }

    useEffect(() => {
        if (loggingUser) {
            setShowTop3Renter(false);
        }
    }, []);

    if (showTop3Renter){
        return <div>Loading...</div>
    }
    return (
        <div>
            {loggingUser ? (
                <>
                  <Top3Rents selectedUserId={loggingUser.id}/>
                </>
            ) : (
                <p>vui lòng đăng nhập</p>
            )}
        </div>
    )
}
export default HomePageRenter;