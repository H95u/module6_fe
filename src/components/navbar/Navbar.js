import React, {useEffect, useState} from "react";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Input, IconButton, Badge
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    EyeIcon,
    BellIcon
} from "@heroicons/react/24/outline";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import RechargeModal from "../recharge-modal/RechargeModal";
import {HomeIcon} from "@heroicons/react/24/solid";
import FormNavBar from "../messageForUser/FormNavBar";
import "./Navbar.css"
import Swal from "sweetalert2";


const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));


function LoginButton() {
    return (
        <div className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Link to="/login">
                <Button
                    variant="gradient"
                    size="sm"
                >
                    Đăng nhập
                </Button>
            </Link>
        </div>
    );
}

function ProfileMenu() {
    const [showRecharge, setShowRecharge] = useState(false);
    const handleCloseRecharge = () => setShowRecharge(false);
    const handleShowRecharge = () => setShowRecharge(true);

    const navigate = useNavigate();
    const id = loggingUser.id;
    const handleProfileInfo = () => {
        navigate("/user-info")
    };

    const handleEditProfile = () => {
        navigate("/edit-info")
    };

    const handleRecharge = () => {
        handleShowRecharge();
    };
    const handleTransaction = () => {
        navigate(`/view-transaction/${id}`)
    };


    const handleManagement = () => {
        navigate(`/management`)
    };

    const handleLogout = () => {
        localStorage.removeItem("loggingUser");
        window.location.href = "/";
    };


// profile menu component
    const profileMenuItems = [
        {
            label: "Thông tin cá nhân",
            icon: UserCircleIcon,
            handler: handleProfileInfo,
        },
        ...((loggingUser.status === 1) || (loggingUser.status === 2)
            ? [
                {
                    label: "Chỉnh t.tin CCDV",
                    icon: Cog6ToothIcon,
                    handler: handleEditProfile,
                },
            ]
            : []),
        {
            label: "Nạp tiền",
            icon: InboxArrowDownIcon,
            handler: handleRecharge,
        },
        {
            label: "Lịch sử giao dịch",
            icon: EyeIcon,
            handler: handleTransaction,
        },
        ...(loggingUser.status === 5) ? [
                {
                    label: "Q.lý người dùng",
                    icon: LifebuoyIcon,
                    handler: handleManagement,
                },
            ]
            : [],
        {
            label: "Đăng xuất",
            icon: PowerIcon,
            handler: handleLogout,
        },

    ];


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-blue-500 p-0.5"
                        src={loggingUser.img}
                    />

                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({label, icon, handler}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                closeMenu();
                                handler();
                            }}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
            <RechargeModal showRecharge={showRecharge} handleCloseRecharge={handleCloseRecharge}/>
        </Menu>
    );
}

export function ComplexNavbar() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const maxResults = 5;

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };
    const getBookings = () => {
        axios.get(`http://localhost:8080/api/bookings/waiting/${loggingUser.id}`)
            .then(response => {
                if (response.data.length > 0) {
                    setBookings(response.data)
                    Swal.fire({
                        icon: 'info',
                        title: 'Yoyo...',
                        text: 'Bạn có đơn mới chưa xác nhận !',
                        confirmButtonText: "OK, Để sau",
                        footer: '<a href="#" id="viewOrderLink">Đến trang xem thông tin đơn ?</a>'
                    })
                    document.getElementById('viewOrderLink').addEventListener('click', () => {
                        navigate(`/view-transaction/${loggingUser.id}`);
                    });
                }
                ;
            })
    };

    useEffect(() => {
        getUsers();
        if (loggingUser != undefined) {
            getBookings()
        }
    }, []);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (showPopover) {
                setShowPopover(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [showPopover]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchInputValue(newValue);

        const results = users.filter((user) =>
            user.username.toLowerCase().includes(newValue.toLowerCase())
        );
        setAutocompleteResults(results.slice(0, maxResults));

        setShowPopover(newValue !== "" && results.length > 0);
    };

    const handleLinkClick = () => {
        setSearchInputValue("");
        setShowPopover(false);
    };
    const [showFormNavBar, setShowFormNavBar] = useState(false);

    const handleIconButtonClick = () => {
        setShowFormNavBar(!showFormNavBar);
    };

    return (
        <Navbar id={"nav"} className="max-w-screen-4xl w-full mx-auto px-4 py-3">
            <div className="mx-auto flex text-blue-gray-900">
                <a href={"/"}>
                    <Avatar src={"/loverLogo.png"} className={"mr-10"}>
                    </Avatar>
                </a>
                <div className="relative flex w-full gap-96 md:w-max">

                    <Input
                        id="search-input"
                        type="search"
                        label="Nhập tên..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                        value={searchInputValue}
                        onChange={handleInputChange}
                    />

                    {showPopover && (
                        <div className={"auto-complete"}>
                            <ul>
                                {autocompleteResults.map((user) => (
                                    <Link to={`/user/${user.id}`} onClick={handleLinkClick} key={user.id}>
                                        <li className="flex items-center">
                                            <img alt={"..."} className={"h-10 w-10 p-2 rounded-full"} src={user.img}/>
                                            <p className="ml-4 font-bold text-center">{user.username}</p>
                                        </li>
                                        <hr/>
                                    </Link>
                                ))}
                                {autocompleteResults.length > 0 && (
                                    <li className="flex items-center">
                                        <Link onClick={handleLinkClick} to={`/view-all?name=${searchInputValue}`}>
                                            <Typography className={"ml-2 p-2 text-center"} color={"blue"}
                                                        variant={"h5"}> Xem tất
                                                cả</Typography>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 lg:block">
                    <Link to={"/"}>
                        <IconButton color="pink">
                            <HomeIcon className="h-10 w-10"/>
                        </IconButton>
                    </Link>
                </div>
                <div className="absolute top-2/4 right-28 -translate-y-2/4 mr-24">
                    <Typography variant={"h4"} color={"pink"} className={"italic font-light"}>
                        Cupid - Kết nối yêu thương
                    </Typography>
                </div>
                {loggingUser != null ? <div className="absolute top-2/4 right-0 -translate-y-2/4 mr-24">
                    <div>
                        <div className="dropdown-container">
                            <Badge content={bookings.length}>
                                <IconButton color="blue" onClick={handleIconButtonClick}>
                                    <BellIcon className="h-10 w-10"/>
                                </IconButton>
                            </Badge>
                        </div>
                    </div>
                </div> : ""}
                {loggingUser != null ? <ProfileMenu/> : <LoginButton/>}
            </div>
        </Navbar>
    );
}
