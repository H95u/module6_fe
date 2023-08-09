import React, {useState, useEffect} from "react";
import Top3Rents from "../Top3Rents";

const HomePageRenter = () => {
    const [showTop3Renter, setShowTop3Renter] = useState(false);
    const [currentsUser, setCurrentUser] = useState(null);

    const handleShowTop3Renters = () => {

        setShowTop3Renter(true);
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setCurrentUser({id: userId, username: ""});
        }
    }, []);

    return (
        <div>
            <h1>Home Page Renters</h1>
            {currentsUser ? (
                <>
                    <p>Người cung cấp dịch vụ: {currentsUser.username}</p>
                    <button onClick={handleShowTop3Renters}>CCDV</button>
                    {showTop3Renter && <Top3Rents selectedUserId={currentsUser.id}/>}
                </>
            ) : (
                <p>vui lòng đăng nhập</p>
            )}
        </div>
    )
}
export default HomePageRenter;