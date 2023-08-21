import React, {useState} from 'react';
import "./Admin.css"
import LockSharpIcon from '@mui/icons-material/LockSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { Switch } from "@material-tailwind/react";
function Admin() {
    function validateLoginForm(e) {
        e.preventDefault();
        const username = document.getElementById('UserName').value;
        const password = document.getElementById('Password').value;

        if (username === '') {
            alert('Tên đăng nhập của bạn là gì?');
            return;
        }

        if (password === '') {
            alert('Bạn chưa nhập mật khẩu!');
            return;
        }

        // document.getElementById('Password').value = MD5(password);
        e.target.submit();
    }
    return (
        <>
            <div className={"form-admin"}>
                <div id="wrapper">
                    <div className="container">
                        <div id="header">
                            <div className="right">
                                <div className="menu-top">
                                    <ul className="menu-top-ul">
                                        <li className="menu-top-li"><a href="https://id.duo.vn/">Trang chủ DUO <span
                                            className="tilde">|</span></a>
                                            <a href="http://diendan.duo.vn/">Diễn đàn</a>
                                        </li>

                                    </ul>
                                </div>
                                <div className="menu">
                                    <ul className="menu-ul">
                                        <li id="l_home" className="menu-li home">
                                            <a href="/">
                                                <span className="menu-icon">
                                                <HomeSharpIcon/>
                                                </span>
                                                <span>Trang chủ</span>
                                            </a>
                                        </li>
                                        <li id="l_prepay" className="menu-li coin">
                                            <a href="">
                                                <span className="menu-logo"></span>
                                                <span>Nạp thẻ</span>
                                            </a>
                                        </li>
                                        <li id="" className="menu-li change">
                                            <a href="/Payment/PreTransfer">
                                                <span className="menu-logo"></span>
                                                <span>Đổi đĩnh</span>
                                            </a>
                                        </li>
                                        <li id="l_news" className="menu-li news-m">
                                            <a href="/News?Type=1">
                                                <span className="menu-logo"></span>
                                                <span>Số dư</span>
                                            </a>
                                        </li>
                                        <li id="l_guide" className="menu-li guide">
                                            <a href="/News?Type=2">
                                                <span className="menu-icon">
                                                    <LockSharpIcon />
                                                </span>
                                                <span>Khóa tài khoản</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id="gosu-ads-unit-226"></div>
                            <script
                                type="text/javascript"
                                src="https://ads.gosu.vn/index.php/js/liberty_position/id/226"
                            ></script>
                        </div>
                    </div>

                    <div className="container">
                        <div id="main">
                            <div className="left">
                                <div className="slide">
                                    <div id="slideshow">
                                        <img
                                            src="/themes/duo/images/img/image1.png"
                                            style={{
                                                display: 'block',
                                                opacity: 0.890215
                                            }}
                                        />
                                        <img
                                            src="/themes/duo/images/img/image2.png"
                                            style={{display: 'none'}}
                                        />
                                        <img
                                            src="/themes/duo/images/img/image3.png"
                                            style={{display: 'none'}}
                                        />
                                        <img
                                            src="/themes/duo/images/img/image4.png"
                                            style={{
                                                display: 'inline',
                                                opacity: 0.109785
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                <div className="title"></div>
                                <div className="form">
                                    <form
                                        action="/Account/LogOn"
                                        method="post"
                                        name="loginform"
                                        onSubmit={validateLoginForm}
                                    >
                                        <p className="lable">Tên đăng nhập :</p>
                                        <input
                                            className="usernameleft"
                                            type="text"
                                            id="UserName"
                                            name="UserName"
                                            defaultValue=""
                                            // onFocus={(e) => myFocus(e.target)}
                                            // onBlur={(e) => myBlur(e.target)}
                                            fdprocessedid="acazhj"
                                        />
                                        <p className="lable pd-t5">Mật khẩu :</p>
                                        <input
                                            className="passwordleft"
                                            type="password"
                                            id="Password"
                                            name="Password"
                                            defaultValue=""
                                            // onFocus={(e) => myFocus(e.target)}
                                            // onBlur={(e) => myBlur(e.target)}
                                            fdprocessedid="zqdlob"
                                        />
                                        <p className="remenber">
                                            <input type="checkbox"/> Ghi nhớ mật khẩu
                                        </p>
                                        <p>
                                            <input
                                                type="submit"
                                                value=" "
                                                className="but-sign"
                                                fdprocessedid="n5dj2b"
                                            />
                                        </p>
                                    </form>
                                </div>
                                <div className="forget">
                                    <a href="/Account/LostPassword">Quên mật khẩu ?</a>
                                    <a href="/Account/LostAccount">Quên tài khoản ?</a>
                                    <div className="welcome">
                                        <p>Chưa có tài khoản? </p>{' '}
                                        <a href="/Account/Register">Đăng ký</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;