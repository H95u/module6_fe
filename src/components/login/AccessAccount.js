import React, {useEffect, useRef, useState} from 'react';
import "./AccessAcount.css"
import axios from "axios";

const AccessAccount = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])


    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username: user, password: password });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setUser('');
        setPassword('');
        setSuccess(true);
    }
    return (
        <>
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Dành cho người dùng</h3>
                    <form onSubmit={handleLoginUser}>
                        <div className="form-group">
                            <input id="username"
                                   ref={userRef}
                                   type="text"
                                   className="form-control"
                                   placeholder="Username"
                                   autoComplete="off"
                                   onChange={(e) => setUser(e.target.value)}
                                   value={user}
                                   required/>
                        </div>
                        <div className="form-group">
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Password"
                                required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Đăng nhập"/>
                            <input type="submit" className="btnSubmit" value="Đăng ký"/>
                        </div>
                        <div className="form-group">
                            <a href="#" className="ForgetPwd">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Dành cho người cung cấp dịch vụ</h3>
                    <form onSubmit={handleLoginUser}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Đăng nhập"/>
                            <input type="submit" className="btnSubmit" value="Đăng ký"/>

                        </div>
                        <div className="form-group">
                            <a href="#" className="ForgetPwd" value="Login">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default AccessAccount;
