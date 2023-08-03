import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Container, Row, Col, Card, Image, InputGroup, FormControl, Button} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from "formik";
import "./Login.css";
import {Typography, Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const navigate = useNavigate();
    const initialValue = {
        username: "",
        password: ""
    };

    const validateSchema = Yup.object({
        username: Yup.string()
            .required("UserName is required")
            .matches(/^[a-zA-ZÀ-ỹ]+(([',. -][a-zA-ZÀ-ỹ ])?[a-zA-ZÀ-ỹ]*)*$/, "username must contain only letters"),
        password: Yup.string()
            .required("Password is required")
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
                    title: "Login success!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(result => {
                    if (result.isConfirmed) {
                        localStorage.setItem("loggingUser", JSON.stringify(response.data.body));
                        navigate("/");
                        window.location.reload();
                    }
                });
            })
            .catch(error => {
                setErrors({errorMessage: "Login failed"});
                Swal.fire({
                    title: "Error!",
                    text: "Login failed",
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
                        <Col md="6">
                            <Image
                                src="https://image-us.24h.com.vn/upload/3-2018/images/2018-07-27/1532655855-378-hot-girl-tram-anh-xinh-dep-di-su-kien-bo-mac-loi-xi-xao-8-1532653812-width640height960.jpg"
                                alt="login form"
                                className="rounded-start w-100"
                            />
                        </Col>

                        <Col md="6">
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
                                        Sign in
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
                                                <InputGroup.Text>User name</InputGroup.Text>
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
                                                <InputGroup.Text>Password</InputGroup.Text>
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
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <Button
                                                    type="submit"
                                                    className="mb-4 px-5"
                                                    variant="dark"
                                                    size="lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Loading..." : "Login"}
                                                </Button>

                                                &ensp;
                                                &ensp;

                                                <Button
                                                    type="reset"
                                                    className="mb-4 px-5"
                                                    variant="dark"
                                                    size="lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Loading..." : "Reset"}
                                                </Button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>

                                <div style={{display: 'flex', justifyContent: 'space-between', color: "#393f81"}}>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>

                                    <Link to={"/signup"}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </div>

                                {/*<div style={{*/}
                                {/*    display: "flex",*/}
                                {/*    justifyContent: "center",*/}
                                {/*    alignItems: "center",*/}
                                {/*    height: "100vh",*/}
                                {/*    marginTop: "-20px"*/}
                                {/*}}>*/}
                                {/*    <img*/}
                                {/*        src="https://files.playerduo.net/production/images/donate_gif/0.gif"*/}
                                {/*        className="jumping-image"*/}
                                {/*        alt="load"*/}
                                {/*        style={{width: "200px", height: "200px",}}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default Login;