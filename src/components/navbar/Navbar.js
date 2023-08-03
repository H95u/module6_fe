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
    Input, Dialog, CardHeader, CardBody, Checkbox, CardFooter,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,

} from "@heroicons/react/24/outline";
import {Card} from "react-bootstrap";


const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

const handleProfileInfo = () => {
    // Implement the function for "Thông tin cá nhân"
    // e.g., redirect to the user's profile page
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

export function DialogWithForm() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <Button
                variant={"gradient"}
                size={"sm"}
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                onClick={handleOpen}>Đăng nhập
            </Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Đăng nhập
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Tên đăng nhập" size="lg" />
                        <Input label="Mật khẩu" size="lg" />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth>
                            Đăng nhập
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Bạn chưa có tài khoản?
                            <Typography
                                as="a"
                                href="/login"
                                variant="small"
                                color="blue"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Đăng ký
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
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
        <Navbar id={"nav"}>
            <div className=" mx-auto flex text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
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
                {loggingUser != null ? <ProfileMenu/> : <DialogWithForm/>
                }
            </div>

        </Navbar>
    );
}