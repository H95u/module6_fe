import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterUser = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        nickname: "",
        email: "",
        gender: "",
        dob: "",
        password: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("UserName is required")
            .matches(/^[a-zA-Z0-9]{3,16}$/,"username must contain only letters"),
        nickname: Yup.string()
            .required("NickName is required")
            .matches(/^[a-zA-Z0-9]{3,16}$/,"NickName must contain only letters"),
        email: Yup.string()
            .required("Email is required")
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email must contain letters and the @ symbol."),
        gender: Yup.string()
            .required("Gender is required"),
        dob: Yup.string()
            .required("Date of birth is required"),
        // .matches(/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,"Enter date of birth"),
        password: Yup.string()
            .required("Password is required")
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password enter letters and numbers")
    })

    const handleSubmit = (values, { setSubmitting }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        if (!values.username || !values.email || !values.password) {
            setSubmitting(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const genderValue = values.gender === "male" ? 1 : 2;

        axios.post("http://localhost:8080/api/auth/register", {
            username: values.username,
            email: values.email,
            nickname: values.nickname,
            gender: genderValue,
            dob: values.dob,
            password: values.password
        }, config)
            .then(response => {
                setSubmitting(false);
                Swal.fire({
                    title: 'Register success!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                })
            })
            .catch(error => {
                setSubmitting(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Registration failed',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className='bg-dark'>
                            <div className='container-fluid'>
                                <div className='row d-flex justify-content-center align-items-center h-100'>
                                    <div className='col'>

                                        <div className='card my-4'>

                                            <div className='row g-0'>

                                                <div className='col-md-6 d-none d-md-block'>
                                                    <img src='https://nguoinoitieng.net/wp-content/uploads/2022/12/Ngo-Nha-Linh-1-e1670894623449-1013x1536.jpg' alt='Sample photo' className='card-img rounded-start' />
                                                </div>

                                                <div className='col-md-6'>

                                                    <div className='card-body text-black d-flex flex-column justify-content-center'>
                                                        <h3 className='mb-5 text-uppercase fw-bold'>Lover registration form</h3>

                                                        <div className='mb-4'>
                                                            <label htmlFor='username' className='form-label'>UserName</label>
                                                            <Field type='text' className='form-control form-control-lg' id='username' name='username' />
                                                            <ErrorMessage name='username' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='nickname' className='form-label'>NickName</label>
                                                            <Field type='text' className='form-control form-control-lg' id='nickname' name='nickname'/>
                                                            <ErrorMessage name='nickname' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='email' className='form-label'>Email</label>
                                                            <Field type='email' className='form-control form-control-lg' id='email' name='email' />
                                                            <ErrorMessage name='email' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='gender' className='form-label'>Gender</label>
                                                            <Field as='select' className='form-select form-select-lg' id='gender' name='gender'>
                                                                <option value=''>Select Gender</option>
                                                                <option value='male'>Male</option>
                                                                <option value='female'>Female</option>
                                                            </Field>
                                                            <ErrorMessage name='gender' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='dob' className='form-label'>Date of birth</label>
                                                            <Field type='date' className='form-control form-control-lg' id='dob' name='dob' placeholder='MM/DD/YYYY' />
                                                            <ErrorMessage name='dob' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='password' className='form-label'>Password</label>
                                                            <Field type='password' className='form-control form-control-lg' id='password' name='password' />
                                                            <ErrorMessage name='password' component='div' className='text-danger' />
                                                        </div>

                                                        <div className='d-grid'>
                                                            <button type='submit' className='btn btn-primary btn-lg' disabled={isSubmitting}>Register</button>
                                                        </div>

                                                        <div className='mt-4 text-center'>
                                                            <p className='mb-0'>Already have an account? <Link to='/login'>Login</Link></p>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegisterUser;