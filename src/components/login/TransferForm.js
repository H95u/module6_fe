import React from "react";
import {Link} from "react-router-dom";
import "./TransferForm.css"
export default function TransferForm () {
    return(
        <>
            <div className={"create_account-content"}>
                <ul>
                    <li>
                        <h2>
                            <strong>Tuyển dụng</strong>
                            "Dành cho"
                            <em>Cộng tác viên</em>
                        </h2>
                        <p >
                            "Bạn muốn gia tăng thêm thu nhập? Hãy tham gia trở thành
                            cộng tác viên của chúng tôi."
                        </p>
                        <p>
                            <Link className={"btn btn-success"} to="/">Đăng nhập</Link>
                        </p>
                        <div className={"create_account-button"}>
                            "Bạn chưa có tài khoản"
                            <br/>
                            <Link className={"btn btn-success"}  to="/register-partner">Đăng ký tại đây</Link>
                        </div>
                    </li>
                    <li>
                        <h2>
                            "Dành cho"
                            <em>Người dùng</em>
                            <p>
                                "Tham gia với chúng tôi để nhận được dịch vụ tốt nhất."
                            </p>
                            <p>
                                <Link className={"btn btn-success"} to="/">Đăng nhập</Link>
                            </p>
                            <div className={"create_account-button"}>
                                "Bạn chưa có tài khoản"
                                <br/>
                                <Link className={"btn btn-success"} to="/register-user">Đăng ký tại đây</Link>
                            </div>
                        </h2>
                    </li>
                </ul>
            </div>
        </>
    )
}
