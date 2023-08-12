import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {ChevronRightIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {Link, useParams} from "react-router-dom";
import Top3Rents from "../top3BookingUser/Top3Rents";
import Top3RecentRenters from "../top3BookingUser/Top3RecentRenters";
import ViewRent from "../list/ViewRent";

export default function MenuBar() {
    const [open, setOpen] = React.useState(0);
    const [showTop3Renters, setShowTop3Renters] = React.useState(false);
    const [showTop3RecentRenters, setShowTop3RecentRenters] = React.useState(false);
    const [showRentHistory, setShowRentHistory] = React.useState(true);
    const [historyDropdownOpen, setHistoryDropdownOpen] = React.useState(false);
    const {id} = useParams();
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const toggleHistoryDropdown = () => {
        setHistoryDropdownOpen(!historyDropdownOpen);
    };

    const handleOpenRentHistory = () => {
        setShowRentHistory(true);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(false);
    }

    const handleOpenTop3Renters = () => {
        setShowRentHistory(false);
        setShowTop3Renters(true);
        setShowTop3RecentRenters(false);
    }
    const handleOpenTop3RecentRenters = () => {
        setShowRentHistory(false);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(true);
    }


    return (
        <div className={"container-view"}>
            <div className={"row"}>
                <div className={"setting_main-menu col-lg-3 col-md-3 col-sm-12 col-xs-12"}>
                    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                        <div className="mb-2 p-4">
                            <Typography variant="h5" color="blue-gray">
                                Danh mục
                            </Typography>
                        </div>
                        <List>
                            <Accordion
                                open={open === 1}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <PresentationChartBarIcon className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Tài khoản
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3}
                                                                  className={`h-3 w-5 ${historyDropdownOpen ? "rotate-90" : ""}`}/>
                                            </ListItemPrefix>
                                            <div className="icon-hover" onClick={toggleHistoryDropdown}>
                                                <i className="bi bi-person-circle icon-hover"> Thông tin lịch
                                                    sử{" "}</i>
                                            </div>
                                        </ListItem>
                                        {historyDropdownOpen && (
                                            <List>
                                                <ListItem>
                                                    <i className="bi bi-card-checklist icon-hover"
                                                       onClick={handleOpenRentHistory}> Xem danh sách đơn thuê</i>
                                                </ListItem>
                                                <ListItem>
                                                    <i className="bi bi-eye icon-hover"
                                                       onClick={handleOpenTop3Renters}> Xem người thuê nhiều nhất</i>
                                                </ListItem>
                                                <ListItem>
                                                    <i className="bi bi-eye icon-hover"
                                                       onClick={handleOpenTop3RecentRenters}> Xem người thuê gần
                                                        nhất</i>
                                                </ListItem>
                                            </List>
                                        )}
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            <i className="bi bi-credit-card-2-back icon-hover"> Thanh toán</i>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                            <Accordion
                                open={open === 2}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <ShoppingBagIcon className="h-5 w-5"/>
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Ví điện tử
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            <i className="bi bi-credit-card-2-back icon-hover"> Cài đăt</i>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            <i className="bi bi-link-45deg icon-hover"> Link pay</i>
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                            <ListItem>
                                <ListItemPrefix>
                                    <UserCircleIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Thông tin cá nhân
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <PowerIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Đăng xuất
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className={"col-lg-9"}>
                    {showRentHistory && <ViewRent/>}
                    {showTop3Renters && <Top3Rents selectedUserId={id}/>}
                    {showTop3RecentRenters && <Top3RecentRenters selectedUserId={id}/>}
                </div>
            </div>
        </div>
    );
}
