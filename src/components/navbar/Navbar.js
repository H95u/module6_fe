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
    Input
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
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import RechargeModal from "../recharge-modal/RechargeModal";


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

function Icon({id, open}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
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


    const handleHelp = () => {
        // Implement the function for "Trợ giúp"
        // e.g., show a help modal or redirect to a help page
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
                    label: "Chỉnh sửa thông tin",
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

        {
            label: "Trợ giúp",
            icon: LifebuoyIcon,
            handler: handleHelp,
        },
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
    const [showPopover, setShowPopover] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const maxResults = 5;

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

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
        setSearchInputValue(""); // Reset input value
        setShowPopover(false); // Close popover
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
                            <table className="table table-hover">
                                <tbody>
                                {autocompleteResults.map((user) => (
                                    <tr key={user.id} className="p-2">
                                        <Link to={`/user/${user.id}`} onClick={handleLinkClick}>
                                            <td><img className={"h-10 w-10 rounded-full"} src={user.img}/></td>
                                            <td>{user.username}</td>
                                        </Link>
                                    </tr>

                                ))}
                                {autocompleteResults.length > 0 && (
                                    <tr>
                                        <td className="text-center">
                                            <Link to="/view-all">Xem tất cả</Link>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 lg:block">
                    <Link to={"/"}>
                        <i style={{fontSize: "50px"}} className="bi bi-house-heart icon-hover cursor-pointer"></i>
                    </Link>
                </div>
                <div className="absolute top-2/4 right-0 -translate-y-2/4 mr-24">
                    <i style={{fontSize: "45px"}} className="bi bi-bell icon-hover cursor-pointer"></i>
                </div>
                {loggingUser != null ? <ProfileMenu/> : <LoginButton/>}
            </div>
        </Navbar>
    );
}
