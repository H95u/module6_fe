import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Card, Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaCubes } from 'react-icons/fa';

import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
    const [registerOption, setRegisterOption] = useState("option1");
    const navigate = useNavigate();

    const initialValue = {
        username: "",
        email: "",
        password: ""
    };

    const validateSchema = Yup.object({
        username: Yup.string()
            .required("UserName is required")
            .matches(/^[a-zA-Z0-9]{3,16}$/, "username must contain only letters"),
        email: Yup.string()
            .required("Email is required")
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email must contain letters and the @ symbol."
            ),
        password: Yup.string()
            .required("Password is required")
    });

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
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
                        navigate("/home");
                    }
                });
            })
            .catch(error => {
                setErrors({ errorMessage: "Login failed" });
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
            <Container className="my-5">
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
                                    <FaCubes
                                        className="me-3"
                                        style={{ color: "#ff6219", fontSize: "3rem" }}
                                    />
                                    <span className="h1 fw-bold mb-0">Lover</span>
                                </div>

                                <h5
                                    className="fw-normal my-4 pb-3"
                                    style={{ letterSpacing: "1px" }}
                                >
                                    Sign into your account
                                </h5>

                                <Formik
                                    initialValues={initialValue}
                                    validationSchema={validateSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting, errors, touched }) => (
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
                                                <InputGroup.Text>Email address</InputGroup.Text>
                                                <Field
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className={`form-control ${
                                                        touched.email && errors.email ? "is-invalid" : ""
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="email"
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
                                            <Button
                                                type="submit"
                                                className="mb-4 px-5"
                                                variant="dark"
                                                size="lg"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Loading..." : "Login"}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>

                                <a className="small text-muted" href="#!">
                                    Forgot password?
                                </a>
                                {/*<p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>*/}
                                {/*    Don't have an account?{" "}*/}
                                {/*    <a href="#!" style={{ color: "#393f81" }}>*/}
                                {/*        <Link to={"/register"}>Register here</Link>*/}
                                {/*    </a>*/}
                                {/*</p>*/}

                                <div>
                                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                        Don't have an account?{" "}
                                        <select
                                            value={registerOption}
                                            onChange={(e) => setRegisterOption(e.target.value)}
                                        >
                                            <option value="option1">Đăng ký làm người dùng</option>
                                            <option value="option2">Đăng ký làm cộng tác viên</option>
                                        </select>
                                    </p>
                                    {registerOption === "option1" ? (
                                        <Link to={"/registerUser"}>Register User</Link>
                                    ) : (
                                        <Link to={"/registerCCDV"}>Register CCDV</Link>
                                    )}
                                </div>

                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    );
};

export default Login;