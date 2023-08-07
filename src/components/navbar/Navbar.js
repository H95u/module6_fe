import React, {useState} from "react";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Input,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,

} from "@heroicons/react/24/outline";
import {Link, useNavigate} from "react-router-dom";
import RentModal from "../rentModal/RentModal";
import { FaBell } from "react-icons/fa";


const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

const handleProfileInfo = () => {
    window.location.href = "/user-info"
};

const handleEditProfile = () => {
    window.location.href = "/edit-info"
};

const handleRecharge = () => {
    // Implement the function for "Nạp tiền"
    // e.g., show a recharge modal or redirect to a recharge page
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
    ...(loggingUser != null && loggingUser.status === 1
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
        </Menu>
    );
}

export function ComplexNavbar() {
    const [showRentModal, setShowRentModal] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const navigate = useNavigate();
    const handleSearch = () => {
        let searchInput = document.getElementById('search-input').value.toLowerCase();
        navigate(`/?name=${searchInput}`)
    }

    const handleOpenRentModal = () => {
        setShowRentModal(true);
    }

    const handleCloseRentModal = () => {
        setShowRentModal(false);
    }

    const handleAcceptRent = () => {
        setNotificationCount(notificationCount - 1);
    }

    const handleRejectRent = () => {
        setNotificationCount(notificationCount - 1);
    }



    return (
        <Navbar id={"nav"} className="mx-auto max-w-screen-xl px-4 py-3">
            <div className="mx-auto flex text-blue-gray-900">
                <Link to={"/"}>
                    <Avatar src={"/loverLogo.png"} className={"mr-4"}>
                    </Avatar>
                </Link>
                <div className="relative flex w-full gap-2 md:w-max">
                    <Input
                        id="search-input"
                        type="search"
                        label="Nhập tên..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <Button size="sm" className="!absolute right-1 top-1 rounded" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
                <div className="relative">
                    <button
                        variant="icon"
                        size="sm"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full p-1 md:p-2"
                        onClick={handleOpenRentModal}
                    >
                        <FaBell size={20} style={{ color: "#04020d" }} />
                        {notificationCount > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                                style={{ fontSize: "10px" }}
                            >
                            {notificationCount}
                            </span>
                        )}
                    </button>
                    {notificationCount > 0 && (
                        <div className="absolute z-10 right-0 mt-2 bg-white rounded-lg shadow-lg w-56">
                            <div className="p-2">Notification 1</div>
                            <div className="p-2">Notification 2</div>
                        </div>
                    )}
                </div>
                {loggingUser != null ? <ProfileMenu/> : <LoginButton/>
                }
            </div>
            <RentModal
                show={showRentModal}
                onClose={handleCloseRentModal}
                onAccept={handleAcceptRent}
                onReject={handleRejectRent}
            />
        </Navbar>
    );
}
