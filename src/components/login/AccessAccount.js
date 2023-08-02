import React, {useState} from 'react';
import "./AccessAcount.css"
import axios from "axios";

const AccessAcount = () => {
    const[users, setUsers] = useState([]);
    const[password, setPassword] = useState([]);

    const handleLoginUser = () => {
        axios.post(`http://localhost:8080/api/users`)
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Dành cho người dùng</h3>
                    <form>
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
                            <a href="#" className="ForgetPwd">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Dành cho người cung cấp dịch vụ</h3>
                    <form>
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
    );
};

export default AccessAcount;
