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
            {loggingUser ? (
                <>
                    <Top3RecentRenters selectedUserId={loggingUser.id}/>
                </>
            ) : (
                <p>vui lòng đăng nhập</p>
            )}
        </div>
    )
}

export default HomePageRecent;