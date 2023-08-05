import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Container, Row, Col, Card, Image, InputGroup, Button} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from "formik";
import "./Login.css";
import {Typography, Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {FooterWithSocialLinks} from "../footer/Footer";


const Login = () => {
    const navigate = useNavigate();
    const initialValue = {
        username: "",
        password: ""
    };

    const validateSchema = Yup.object({
        username: Yup.string()
            .required("Tên là bắt buộc")
            .matches(/^[a-zA-ZÀ-ỹ0-9]+(([',. -][a-zA-ZÀ-ỹ0-9 ])?[a-zA-ZÀ-ỹ0-9]*)*$/, "Nhập tên từ a-zA-Z có dấu và số không chứa kí tự đặc biệt"),
        password: Yup.string()
            .required("Mật khẩu là bắt buộc")
    });

    const handleSubmit = (values, {setSubmitting, setErrors}) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };

        axios
            .post("http://localhost:8080/api/auth/login", values, config)
            .then(response => {
                Swal.fire({
                    title: "Đăng nhập thành công!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(result => {
                    if (result.isConfirmed) {
                        const redirectedId = localStorage.getItem("userId");
                        if (redirectedId) {
                            localStorage.removeItem("userId");
                            window.location.href = `/user/${redirectedId}`
                            localStorage.setItem("loggingUser", JSON.stringify(response.data.body));
                        } else {
                            window.location.href = `/`
                            localStorage.setItem("loggingUser", JSON.stringify(response.data.body));
                        }
                    }
                });
            })
            .catch(error => {
                setErrors({errorMessage: "Kiểm tra lại tên đăng nhập hoặc mật khẩu"});
                Swal.fire({
                    title: "Lỗi rồi!",
                    text: "Đăng nhập thất bại",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <Container className="-my-75">
                <Card>

                    <Row className="g-0">
                        <Col md="4">
                            <Image
                                src="https://image-us.24h.com.vn/upload/3-2018/images/2018-07-27/1532655855-378-hot-girl-tram-anh-xinh-dep-di-su-kien-bo-mac-loi-xi-xao-8-1532653812-width640height960.jpg"
                                alt="login form"
                                className="rounded-start w-100"
                            />
                        </Col>

                        <Col md="8">
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex flex-row mt-2">
                                    <img
                                        src="https://th.bing.com/th/id/OIP.RyFICoVUUUvv_AaeRt1X7QHaHa?pid=ImgDet&rs=1"
                                        alt="Your Image"
                                        className="me-3"
                                        style={{width: "4rem", height: "4rem"}}
                                    />
                                    <span className="h1 fw-bold mb-0">Lover</span>
                                </div>

                                <div style={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <Avatar sx={{m: 1, bgcolor: 'rgb(225, 0, 80)'}}>
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Trang đăng nhập
                                    </Typography>
                                </div>

                                <Formik
                                    initialValues={initialValue}
                                    validationSchema={validateSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({isSubmitting, errors, touched}) => (
                                        <Form>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text>Tên đăng nhập</InputGroup.Text>
                                                <Field
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    className={`form-control ${
                                                        touched.username && errors.username
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="username"
                                                    className="invalid-feedback"
                                                />
                                            </InputGroup>

                                            <InputGroup className="mb-4">
                                                <InputGroup.Text>Mật khẩu</InputGroup.Text>
                                                <Field
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className={`form-control ${
                                                        touched.password && errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="password"
                                                    className="invalid-feedback"
                                                />
                                            </InputGroup>
                                            {errors.errorMessage && (
                                                <div className="text-danger mb-4">{errors.errorMessage}</div>
                                            )}
                                            <div style={{display: 'flex', justifyContent: 'center',
                                            }}>
                                                <Button
                                                    type="submit"
                                                    className="mb-4 px-5 bg-primary"
                                                    size="lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Loading..." : "Đăng nhập"}
                                                </Button>
                                                &ensp;
                                                &ensp;

                                                <Button
                                                    type="reset"
                                                    className="mb-4 px-5 bg-primary"
                                                    size="lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Loading..." : "Đặt lại"}
                                                </Button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Link href="#" variant="body2" style={{color: "#393f81"}}>
                                        Quên mật khẩu?
                                    </Link>
                                    <p>Bạn chưa có tài khoản ?
                                        <Link to={"/signup"} style={{color: "#393f81"}}>
                                            Đăng ký tại đây
                                        </Link></p>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
            <hr/>
            <FooterWithSocialLinks/>
        </>
    );
};

export default Login;