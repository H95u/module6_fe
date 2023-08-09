import React, {useState, useEffect} from "react";
import Top3RecentRenters from "../Top3RecentRenters";

const HomePageRecent = () => {
    const [showTop3Recent, setShowTop3Recent] = useState(false);
    const [currentsUser, setCurrentUser] = useState(null);

    const handleShowTop3Recent = () => {
        setShowTop3Recent(true);
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setCurrentUser({id: userId, username: ""});
        }
    }, []);

    return (
        <div>
            <h1>Home Page Recent</h1>
            {currentsUser ? (
                <>
                    <p>Người cung cấp dịch vụ: {currentsUser.username}</p>
                    <button onClick={handleShowTop3Recent}>CCDV</button>
                    {showTop3Recent && <Top3RecentRenters selectedUserId={currentsUser.id}/>}
                </>
            ) : (
                <p>vui lòng đăng nhập</p>
            )}
        </div>
    )
}

export default HomePageRecent;