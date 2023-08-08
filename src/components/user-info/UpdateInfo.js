import {Formik, Form, Field, ErrorMessage} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./UpdateInfo.css";
import {useEffect, useState} from "react";
import MenuBar from "./MenuBar";

export default function UpdateInfo () {
    const {id} = useParams()
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [addressList, setAddressList] = useState([])
    const initialValues = {
        nickname: "",
        email: "",
        dob: "",
        address: "",
        gender: "",
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/info/${id}`)
            .then((response) => {
                setUser(response.data);
                initialValues.nickname = response.data.nickname;
                initialValues.email = response.data.email;
                initialValues.dob = response.data.dob;
                initialValues.address = response.data.address.id;
                initialValues.gender = response.data.gender;
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




    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (values) => {
        values.address = {
            id: +values.address
        }
        console.log(values)
        axios
            .put(`http://localhost:8080/api/users/${id}`, values)
            .then((res) => {
                console.log("Đã lưu thông tin thành công", res.data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Đã có lỗi xảy ra:", error);
            });
    };

    return (
        <>
            <div className={"setting_main row"}>
                <MenuBar/>
            <div className={"col-lg-9 col-md-9 col-sm-12 col-xs-12"} id={"personalinfo"}>
                <h3>Cập nhật thông tin</h3>
                <Formik initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={(values) => handleSubmit(values)}>

                    <Form>
                        <div className={"from-userinfo"}>
                        <div className={"fieldGroup "}>
                            <label className={"control-label"} htmlFor="nickname">Nickname:</label>
                            <Field type={"text"} name={"nickname"}/>
                        </div>
                        <div className="fieldGroup">
                            <label className={"control-label"} htmlFor="email">Email:</label>
                            <Field type="email" name="email" />
                        </div>
                        <div className="fieldGroup">
                            <label className={"control-label"}  htmlFor="dob">Ngày sinh:</label>
                            <Field type="date" name="dob" />
                        </div>
                            <div className="fieldGroup">
                                <label htmlFor="address" className={"control-label"}>
                                    Địa chỉ:
                                </label>
                                <div className="col-sm-10">
                                    <Field as="select" name="address" className="form-select"
                                           aria-label="Default select example">
                                        <option value="">Select address</option>
                                        {addressList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="address" component="div" className="text-danger"/>
                                </div>
                            </div>
                            <div className="fieldGroup">
                                <label className={"control-label"} htmlFor="gender">
                                    Giới tính:
                                </label>
                                <div className={"d-flex"}>
                                    <Field type="radio" name="gender" value="1" />
                                    <label htmlFor="gender">Nam</label>
                                    <Field type="radio" name="gender" value="2" />
                                    <label htmlFor="gender">Nữ</label>
                                </div>
                            </div>
                        <div className="fieldGroup">
                            <button type="submit" className={"btn-update"}>Lưu thông tin</button>
                        </div>
                        </div>

                    </Form>
                </Formik>
            </div>
            </div>
        </>
    )
}
