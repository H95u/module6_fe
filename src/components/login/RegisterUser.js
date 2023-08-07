import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import "./Login.css";
import {Typography, Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegisterUser = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();


    const initialValues = {
        username: "",
        nickname: "",
        email: "",
        gender: "",
        dob: "",
        password: "",
        status: 0
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/all').then((response) => {
            setStudents(response.data);
        });
    }, []);

    const checkEmailExists = (email) => {
        return students.some((student) => student.email === email);
    };
    const checkUserNameExists = (username) => {
        return students.some((student) => student.username === username);
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Tên đăng nhập là bắt buộc")
            .matches(/^[a-zA-ZÀ-ỹ0-9]*(([',. -][a-zA-ZÀ-ỹ0-9 ])?[a-zA-ZÀ-ỹ0-9]*)*$/, "Nhập tên từ a-zA-Z có dấu và số không chứa kí tự đặc biệt").test(
                'unique-username', 'Tên đăng nhập đã tồn tại', function (value) {
                    return !checkUserNameExists(value);
                }),
        nickname: Yup.string()
            .required("Biệt danh là bắt buộc")
            .matches(/^[a-zA-ZÀ-ỹ]+(([',. -][a-zA-ZÀ-ỹ ])?[a-zA-ZÀ-ỹ]*)*$/, "Biệt danh từ a-zA-Z có dấu và không chứa chữ số"),
        gender: Yup.string()
            .required("Giới tính là bắt buộc")
            .matches(/^[a-zA-ZÀ-ỹ]+(([',. -][a-zA-ZÀ-ỹ ])?[a-zA-ZÀ-ỹ]*)*$/, "Giới tính từ a-zA-Z có dấu và không chứa chữ số"),
        dob: Yup.string()
            .required("Ngày sinh là bắt buộc"),
        // .matches(/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,"Enter date of birth"),
        password: Yup.string()
            .required("Mật khẩu là bắt buộc"),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password enter letters and numbers")
        email: Yup.string()
            .required("Email là bắt buộc")
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email từ a-zA-Z có chưa kí tự @ và .gmail ở phía đằng sau").test(
                'unique-email', 'Email đã tồn tại', function (value) {
                    return !checkEmailExists(value);
                }),
    })

    const handleSubmit = (values, {setSubmitting}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const genderValue = values.gender === "male" ? 1 : 2;
        axios.post("http://localhost:8080/api/auth/register", {
            username: values.username,
            email: values.email,
            nickname: values.nickname,
            gender: genderValue,
            dob: values.dob,
            password: values.password,
            status: values.status
        }, config)
            .then(response => {
                setSubmitting(false);
                Swal.fire({
                    title: 'Đăng kí thành công!',
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
                    title: 'Lỗi rồi!',
                    text: 'Đăng kí thất bại',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className={"form-register"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className='#fff'>
                            <div className='container-xxl'>
                                <div className='row d-flex justify-content-center align-items-center h-100'>
                                    <div className='col'>

                                        <div className='card my-0'>

                                            <div className='row g-0'>

                                                <div className='col-md-4'>
                                                    <img
                                                        src='https://sohanews.sohacdn.com/160588918557773824/2020/7/29/photo-5-15959936560561234324432.jpg'
                                                        alt='Sample photo' className='card-img rounded-start'/>
                                                </div>

                                                <div className='col-md-8'>

                                                    <div
                                                        className='card-body text-black d-flex flex-column justify-content-center'>

                                                        <div className={"mx-auto"}>
                                                            <Typography component="h1" variant="h5">
                                                                Trang đăng ký
                                                            </Typography>
                                                        </div>

                                                        <div>
                                                            <label htmlFor='username'
                                                                   className='form-label'>Tên đăng nhập</label>
                                                            <Field type='text' className='form-control form-control-sm'
                                                                   id='username' name='username'/>
                                                            <ErrorMessage name='username' component='div'
                                                                          className='text-danger'/>
                                                        </div>

                                                        <div>
                                                            <label htmlFor='password'
                                                                   className='form-label'>Mật khẩu</label>
                                                            <Field type='password'
                                                                   className='form-control form-control-sm'
                                                                   id='password' name='password'/>
                                                            <ErrorMessage name='password' component='div'
                                                                          className='text-danger'/>
                                                        </div>


                                                        <div>
                                                            <label htmlFor='nickname'
                                                                   className='form-label'>Biệt danh</label>
                                                            <Field type='text' className='form-control form-control-sm'
                                                                   id='nickname' name='nickname'/>
                                                            <ErrorMessage name='nickname' component='div'
                                                                          className='text-danger'/>
                                                        </div>

                                                        <div>
                                                            <label htmlFor='email' className='form-label'>Email</label>
                                                            <Field type='email' className='form-control form-control-sm'
                                                                   id='email' name='email'/>
                                                            <ErrorMessage name='email' component='div'
                                                                          className='text-danger'/>
                                                        </div>

                                                        <div>
                                                            <label htmlFor='gender'
                                                                   className='form-label'>Giới tính</label>
                                                            <Field as='select' className='form-select form-select-sm'
                                                                   id='gender' name='gender'>
                                                                <option value=''>Giới tính</option>
                                                                <option value='male'>Nam</option>
                                                                <option value='female'>Nữ</option>
                                                            </Field>
                                                            <ErrorMessage name='gender' component='div'
                                                                          className='text-danger'/>
                                                        </div>

                                                        <div className='mb-4'>
                                                            <label htmlFor='dob' className='form-label'>Ngày tháng năm sinh</label>
                                                            <Field type='date' className='form-control form-control-sm'
                                                                   id='dob' name='dob' placeholder='MM/DD/YYYY'/>
                                                            <ErrorMessage name='dob' component='div'
                                                                          className='text-danger'/>
                                                        </div>


                                                        <div className='d-grid'>
                                                            <button className='btn btn-primary btn-sm'
                                                                    disabled={isSubmitting}>Đăng ký
                                                            </button>
                                                        </div>

                                                        <div className='mt-4 text-center'>
                                                            <p className='mb-0'>Bạn có tài khoản ? <Link
                                                                to='/login' style={{color: "#393f81"}}>Quay lại trang đăng nhập</Link></p>
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
        </div>
    );
};

export default RegisterUser;