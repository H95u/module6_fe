import React from "react";
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



const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

const handleProfileInfo = () => {
    window.location.href = "http://localhost:3000/user-info"
};

const handleEditProfile = () => {
    // Implement the function for "Chỉnh sửa thông tin"
    // e.g., redirect to the edit profile page
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
    window.location.reload();
};

// profile menu component
const profileMenuItems = [
    {
        label: "Thông tin cá nhân",
        icon: UserCircleIcon,
        handler: handleProfileInfo, // Replace handleProfileInfo with the actual function
    },
    {
        label: "Chỉnh sửa thông tin",
        icon: Cog6ToothIcon,
        handler: handleEditProfile, // Replace handleEditProfile with the actual function
    },
    {
        label: "Nạp tiền",
        icon: InboxArrowDownIcon,
        handler: handleRecharge, // Replace handleRecharge with the actual function
    },
    {
        label: "Trợ giúp",
        icon: LifebuoyIcon,
        handler: handleHelp, // Replace handleHelp with the actual function
    },
    {
        label: "Đăng xuất",
        icon: PowerIcon,
        handler: handleLogout, // Replace handleLogout with the actual function
    },
];

export function LoginButton() {

    return (
        <div>
            <Button
                variant={"gradient"}
                size={"sm"}
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
            </Button>
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


    return (
        <Navbar id={"nav"} className="mx-auto max-w-screen-xl px-4 py-3">
            <div className="mx-auto flex text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    Lover
                </Typography>
                <div className="relative flex w-full gap-2 md:w-max">
                    <Input
                        type="search"
                        label="Nhập tên..."
                        className="pr-20"
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <Button size="sm" className="!absolute right-1 top-1 rounded">
                        Tìm kiếm
                    </Button>
                </div>
                {loggingUser != null ? <ProfileMenu/> : <LoginButton/>
                }
            </div>

        </Navbar>
    );
}