import React from "react";
import {Link} from "react-router-dom";
export default function TranstForm () {
    return(
        <>
            <div className="create_account-content">
                <ul>
                    <li>
                        <h2>
                            <strong>Tuyển dụng</strong>
                            "Dành cho"
                            <em>Cộng tác viên</em>
                        </h2>
                        <p>
                            "Chúng tôi là dịch vụ cho thuê người yêu
                            chuyên nghiệp và uy tín nhất tại Việt Nam."
                        </p>
                        <p>
                            <Link to="/">Đăng nhập</Link>
                        </p>
                        <div className="create_account-button">
                            "Bạn chưa có tài khoản"
                            <br/>
                            <Link to="/">Đăng ký tại đây.</Link>
                        </div>
                    </li>
                    <li>
                        <h2>
                            "For"
                            <em>Người dùng</em>
                            <p>
                                "Tham gia với chúng tôi để nhận được dịch vụ tốt nhất."
                            </p>
                            <p>
                                <Link to="/">Đăng nhập</Link>
                            </p>
                            <div className="create_account-button">
                                "Bạn chưa có tài khoản"
                                <br/>
                                <Link to="/">Đăng ký tại đây.</Link>
                            </div>
                        </h2>
                    </li>
                </ul>
            </div>
        </>
    )
}
