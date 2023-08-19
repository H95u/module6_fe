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
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import RevenueChart from "../chart/RevenueChart";

const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
export default function UserInfo() {
    const id = loggingUser.id;
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [showUser, setShowUser] = useState(true);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showRevenue, setShowRevenue] = useState(false);
    const [initialValues, setInitialValues] = useState({
        nickname: "",
        email: "",
        dob: "",
        addressId: "",
        gender: "",
    });


    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/info/${id}`)
            .then((response) => {
                setUser(response.data);
            })

            .catch((error) => {
                console.error("Đã có lỗi xảy ra:", error);
            });
        axios
            .get("http://localhost:8080/api/addresses")
            .then((response) => {
                setAddressList(response.data);
            })
            .catch((error) => {
                console.error("Đã có lỗi xảy ra khi tải danh sách địa chỉ:", error);
            });

    }, [id]);


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

    // Revenue-Chart

    function displayRevenue() {
        setShowUser(false);
        setShowUpdateUser(false);
        setShowRevenue(true);
    }


    // Update UserInfo
    function closeFormUpdate() {
        setShowUser(true)
        setShowUpdateUser(false)
        setShowRevenue(false)
    }


    function displayFormUpdate() {
        setShowUser(false);
        setShowRevenue(false)
        setShowUpdateUser(true);
        setInitialValues({
            nickname: user.nickname,
            email: user.email,
            dob: user.dob,
            addressId: user.address?.id,
            gender: user.gender + "",
        })
    }

    const validation = Yup.object({
        nickname: Yup.string().min(3, "Độ dài tối thiệu 3 kí tự").required("Nickname là bắt buộc"),
        email: Yup.string()
            .required("Email là bắt buộc")
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Phải là 1 email hợp lệ")
    });

    const handleSubmit = (values) => {
        axios
            .put(`http://localhost:8080/api/users/${id}`, values)
            .then((res) => {
                setUser(res.data)
                Swal.fire({
                    title: "Cập nhật thành công!",
                    icon: "success",
                    confirmButtonText: "OK"
                })
                closeFormUpdate()
            })
            .catch((error) => {
                Swal.fire({
                    title: "Lỗi rồi!",
                    text: "Cập nhật thất bại",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
    };

    const showAlbum = () => {
        navigate(`/album/${id}`)
    }

    return (
        <div className="user-info">
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-3 pt-20"}>
                        <div className="flex items-center justify-between">
                            <Card
                                className="w-84 img-frame"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <CardHeader floated={false} className="h-66">
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
                                            Địa chỉ : {user.address?.name}
                                        </p>
                                    </Typography>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="d-flex flex-wrap mt-2 justify-between">
                            <div className={"row btn-group"}>
                                <div className={"col-md-6"}>
                                    <Button size="md" color="white" className={"mb-2"} onClick={displayRevenue}>
                                        Doanh thu
                                    </Button>
                                    <Button size="md" color="white" onClick={displayFormUpdate}>
                                        Chỉnh sửa
                                    </Button>
                                </div>
                                <div className={"col-md-6"}>
                                    <Button size="md" color="white" className={"mb-2"}>
                                        Chat
                                    </Button>
                                    <Button size="md" color="white" onClick={showAlbum}>
                                        Album
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {showUser && <>
                        <div className={"col-md-9"}>
                            <Typography variant="h2" color="blue" className="mb-2 mt-4 text-center" textGradient>
                                Thông tin cá nhân
                            </Typography>
                            <div className={`my-profile`}>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-person"></i> Họ và Tên</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.username}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-person"></i> Biệt danh</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.nickname}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-envelope"></i> Email</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.email}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-gender-trans"></i> Giới tính</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.gender === 1 ? "Nam" : "Nữ"}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-calendar-check"></i> Ngày sinh</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.dob}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-geo-alt"></i> Địa chỉ</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{user.address?.name}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className={`row`}>
                                    <div className={`col-sm-5`}>
                                        <p className={`title`}><i className="bi bi-piggy-bank"></i> Tài khoản</p>
                                    </div>
                                    <div className={`col-sm-7`}>
                                        <p className={`value`}>{new Intl.NumberFormat('vi-VN',
                                            {style: 'currency', currency: 'VND'})
                                            .format(user.money)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}

                    {showUpdateUser && <>

                        <div className={"col-md-9"}>
                            <div className={`form-update-user`}>
                                <Formik initialValues={initialValues}
                                        enableReinitialize={true}
                                        validationSchema={validation}
                                        onSubmit={(values) => handleSubmit(values)}>

                                    <Form>
                                        <div className={"from-userinfo"}>
                                            <div className={"user-input"}>
                                                <label className={"control-label"} htmlFor="nickname">Nickname</label>
                                                <Field variant={`input`} type={"text"} name={"nickname"}
                                                       placeholder={'NickName'}/>
                                                <ErrorMessage name="nickname" component="div" className="text-danger"/>
                                            </div>
                                            <div className="user-input">
                                                <label className={"control-label"} htmlFor="email">Email</label>
                                                <Field type="email" name="email" placeholder={'Email'}/>
                                                <ErrorMessage name="email" component="div" className="text-danger"/>
                                            </div>
                                            <div className="user-input">
                                                <label className={"control-label"} htmlFor="dob">Ngày sinh</label>
                                                <Field variant={`input`} type="date" name="dob"
                                                       placeholder={'Ngày sinh'}/>
                                            </div>
                                            <div className="user-input">
                                                <label htmlFor="address" className={"control-label"}>
                                                    Địa chỉ
                                                </label>
                                                <div>
                                                    <Field className={`user-select-address`} as="select"
                                                           name="addressId"
                                                           aria-label="Default select example" placeholder={'Địa chỉ'}>
                                                        <option value="">Địa chỉ</option>
                                                        {addressList.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="address" component="div"
                                                                  className="text-danger"/>
                                                </div>
                                            </div>
                                            <div className="form-userinfo">
                                                <label className={"control-label"} htmlFor="gender">
                                                    Giới tính
                                                </label>
                                                <div className={"user-gender"}>
                                                    <label htmlFor="gender" className={`gender-radio`}>
                                                        <Field type="radio" name="gender" value="1"/>
                                                        Nam
                                                    </label>
                                                    <label htmlFor="gender" className={`gender-radio`}>
                                                        <Field type="radio" name="gender" value="2"/>
                                                        Nữ
                                                    </label>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row user-input">
                                                <div className={`col-sm-6`}>
                                                    <button className={"btn-danger"}>Cập nhật</button>
                                                </div>
                                                <div className={`col-sm-6`}>
                                                    <a onClick={closeFormUpdate} className={"btn btn-secondary"}
                                                       href={`#`}>Quay lại</a>
                                                </div>

                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </>}

                    {showRevenue &&
                        <>
                            <RevenueChart/>
                        </>
                    }

                </div>
            </div>
        </div>

    );

}