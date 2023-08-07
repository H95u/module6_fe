import "./user-info.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, Button, Input,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../config/firebase";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
export default function UserInfo() {
    const id = loggingUser.id;
    const [user, setUser] = useState({});
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/info/${id}`)
            .then((response) => {
                setUser(response.data);
            })
    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
            () => {
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const imageDTO = {img: downloadURL};
                    setUser((prevUser) => ({...prevUser, img: downloadURL}));
                    loggingUser.img = downloadURL;
                    localStorage.setItem("loggingUser", JSON.stringify(loggingUser));
                    axios.post(`http://localhost:8080/api/users/change-avatar/${id}`, imageDTO).then(() => {
                        Swal.fire({
                            title: "Thay ảnh đại diện thành công!",
                            icon: "success",
                            confirmButtonText: "Xác nhận !"
                        }).then(result => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    });
                });
            }
        );
    };

    return (
        <div className="user-info">
            <Typography variant="h1" color="light-blue" className="mb-2 text-center" textGradient>
                Thông tin cá nhân
            </Typography>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className=" flex items-center justify-between">
                            <Card
                                className="w-84"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <CardHeader floated={false} className="h-60">
                                    <img
                                        className="h-60 w-60 rounded-full object-center mx-auto justify-items-center"
                                        src={user.img}
                                        alt="profile-picture"
                                    />
                                    {isHovered && (
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-60 p-2 text-center">
                                            <label htmlFor="avatarInput" className="cursor-pointer text-white">
                                                Thay ảnh đại diện
                                            </label>
                                            <input
                                                type="file"
                                                id="avatarInput"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    )}
                                </CardHeader>
                                <CardBody>
                                    <Typography color="blue" className="font-medium text-center" textGradient>
                                        <p>
                                            {user.username}
                                        </p>
                                        ( {user.nickname} )
                                        <p>
                                            Địa chỉ : {user.address != null ? user.address.name : ""}
                                        </p>
                                    </Typography>
                                </CardBody>
                                <CardFooter className="flex justify-center gap-7 pt-2">
                                    <Tooltip content="Like">
                                        <Typography as="a" href="#facebook" variant="lead" color="blue" textGradient>
                                            <i className="fab fa-facebook"/>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip content="Follow">
                                        <Typography as="button" href="#" variant="lead" color="light-blue" textGradient>
                                            <i className="fab fa-twitter"/>
                                        </Typography>
                                    </Tooltip>
                                    <Tooltip content="Follow">
                                        <Typography as="button" href="#" variant="lead" color="purple" textGradient>
                                            <i className="fab fa-instagram"/>
                                        </Typography>
                                    </Tooltip>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="d-flex flex-wrap mt-2 justify-between">
                            <div className={"row btn-group"}>
                                <div className={"col-md-6"}>
                                    <Button size="md" color="white" className={"mb-2"}>
                                        Theo dõi
                                    </Button>
                                    <Link to={"/update-info"} size="md" color="white">
                                        Cài đặt
                                    </Link>
                                </div>
                                <div className={"col-md-6"}>
                                    <Button size="md" color="white" className={"mb-2"}>
                                        Chat
                                    </Button>
                                    <Button size="md" color="white">
                                        Album
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <Card className={"mid-frame"}>
                            <Input
                                type="text"
                                label="Hãy viết gì đó..."
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-[288px]",
                                }}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );

}