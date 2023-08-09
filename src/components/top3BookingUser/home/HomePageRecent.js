import React, {useState, useEffect} from "react";
import Top3RecentRenters from "../Top3RecentRenters";

const HomePageRecent = () => {
    const [showTop3Recent, setShowTop3Recent] = useState(true);

    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

    const handleShowTop3Recent = () => {
        setShowTop3Recent(false);
    }

    useEffect(() => {
        if (loggingUser) {
            setShowTop3Recent(false);
        }
    }, []);

    if(showTop3Recent){
        return <div>Loading...hello</div>
    }

    return (
        <div>
            <h1>Home Page Recent</h1>
            {loggingUser ? (
                <>
                    <p>Người cung cấp dịch vụ: {loggingUser.username}</p>
                    <button onClick={handleShowTop3Recent}>CCDV</button>
                    <Top3RecentRenters selectedUserId={loggingUser.id}/>
                </>
            ) : (
                <p>vui lòng đăng nhập</p>
            )}
        </div>
    )
}

export default HomePageRecent;