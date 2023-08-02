
import "./Navbar.css"
export default function Navbar () {
    return (
        <>
            <header className="menu_header" id="header-menu">
                <div className="menu_navbar fix-menu">
                    <div className="navbar-header">
                        <a href="/" className="logo">
                            <img src="./loverLogo.png" alt="logo lover"/>
                        </a>
                    </div>
                    <div className="navbar">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="item-search">
                                <nav className="Navbar_Item">
                                    <div className="Navbar_Link">
                                        <div className="Group-search visible">
                                            <span className="search input-group">
                                                <input type="text" placeholder="Nickname/Url..." className="form-control"/>
                                                    <span className="input-group-addon">
                                                    <button type="button" className="btn btn-default">
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </button>
                                                    </span>
                                            </span>
                                        </div>
                                    </div>
                                </nav>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-center">
                            <li className="item-icon">
                                <a href="" className="group-user active">
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="item-icon group-fb">
                                <a href=""></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )

import {Button, Input} from "@material-tailwind/react";

export default function Navbar() {


    return (
        <div className={"nav"}>
            <div className={"row"}>
                <div id={"logo"}>
                    <img src={"/banner/logo.png"}/>
                </div>
                <div className={"col-lg-6"}>
                    <div className="relative flex w-full gap-2 md:w-max">
                        <Input
                            type="search"
                            label="Nhập tên..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[300px]",
                            }}
                        />
                        <Button size="sm" className="!absolute right-1 top-1 rounded">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <div className={"col-lg-6"}>
                    <Button
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block"
                    >
                        <span>Đăng nhập</span>
                    </Button>
                </div>

            </div>
        </div>
    );

}