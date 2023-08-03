

const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
export default function EditUserInfo() {

    return (
        <>
            <div className={"container"}>
                <img src={loggingUser.img}/>
            </div>
        </>

    )
}