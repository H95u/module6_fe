import React from 'react';

const NotificationDropdown = () => {
    return (
        <li className="item-icon notificate dropdown open">
            <a
                id="basic-nav-dropdown"
                role="button"
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded="true"
                href="#"
            >
                <div className="item-title">
                    <i className="fal fa-bell"></i>
                </div>
            </a>
            <ul
                role="menu"
                className="dropdown-menu"
                aria-labelledby="basic-nav-dropdown"
            >
                <div className="content">
                    <div className="tab-notif-common">
                        <h5>
                            <span>Thông báo</span>
                        </h5>
                        <div className="tab-action">
                            <p className="active">
                                <span>Chính</span>
                            </p>
                            <p className="">
                                <span>Khác</span>
                            </p>
                            <p className="">
                                <span>Theo dõi</span>
                            </p>
                            <p className="">
                                <span>Tương tác</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div
                            className="infinite-scroll-component"
                            style={{ height: '400px', overflow: 'auto' }}
                        ></div>
                    </div>
                </div>
            </ul>
        </li>
    );
};

export default NotificationDropdown;
