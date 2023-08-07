import { Formik, Form, Field } from "formik";
import {useNavigate, useParams} from "react-router-dom";
import { User } from "../model/User";
import axios from "axios";
import "./UpdateInfo.css";
import {useEffect, useState} from "react";

export default function UpdateInfo (props) {
    const {id} = useParams()
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/info/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Đã có lỗi xảy ra:", error);
            });
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (values) => {
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
            <div className={"col-md-6 col-sm-12 col-xs-12 personalinfo"}>
                <h3>Cập nhật thông tin</h3>
                <Formik initialValues={props.user}
                        enableReinitialize={true}
                        onSubmit={(values) => handleSubmit(values)}>

                    <Form>
                        <div className={"d-flex img-avatar"}>
                            <label htmlFor="img">Chọn file ảnh:</label>
                            <div className={"cropimg-avatar"}>
                            <Field type={"file"} name={"img"}/>
                            </div>
                        </div>
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
                                <label className={"control-label"} htmlFor="address">
                                    Địa chỉ:
                                </label>
                                <Field as="select" name="address">
                                    <option value="">-- Chọn địa chỉ --</option>
                                    {user.address && (
                                        <option value="address1">{user.address.name}</option>
                                    )}
                                </Field>
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
        </>
    )
}
