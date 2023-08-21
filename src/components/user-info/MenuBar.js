import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {ChevronRightIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {Link, useParams} from "react-router-dom";
import Top3Rents from "../top3BookingUser/Top3Rents";
import Top3RecentRenters from "../top3BookingUser/Top3RecentRenters";
import ViewRent from "../list/ViewRent";
import WalletInfo from "./WalletInfo";
import ViewUserRent from "../list/ViewUserRent";
import RevenueChart from "../chart/RevenueChart";

export default function MenuBar() {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const [open, setOpen] = React.useState(0);
    const [showTop3Renters, setShowTop3Renters] = React.useState(false);
    const [showTop3RecentRenters, setShowTop3RecentRenters] = React.useState(false);
    const [showRentHistory, setShowRentHistory] = React.useState(true);
    const [showUserRentHistory, setShowUserRentHistory] = React.useState(false);
    const [showWithdraw, setShowWithdraw] = React.useState(false);
    const [showChart, setShowChart] = React.useState(false);
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
        setShowWithdraw(false);
        setShowUserRentHistory(false);
        setShowChart(false);
    }
    const handleOpenChart = () => {
        setShowChart(true);
        setShowRentHistory(false);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(false);
        setShowWithdraw(false);
        setShowUserRentHistory(false);
    }

    const handleOpenUserRentHistory = () => {
        setShowUserRentHistory(true);
        setShowRentHistory(false);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(false);
        setShowWithdraw(false);
        setShowChart(false);
    }

    const handleOpenTop3Renters = () => {
        setShowRentHistory(false);
        setShowTop3Renters(true);
        setShowTop3RecentRenters(false);
        setShowWithdraw(false);
        setShowUserRentHistory(false);
        setShowChart(false);
    }
    const handleOpenTop3RecentRenters = () => {
        setShowRentHistory(false);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(true);
        setShowWithdraw(false);
        setShowUserRentHistory(false);
        setShowChart(false);
    }

    const handleOpenWithdraw = () => {
        setShowRentHistory(false);
        setShowTop3Renters(false);
        setShowTop3RecentRenters(false);
        setShowWithdraw(true);
        setShowUserRentHistory(false);
        setShowChart(false);
    }


    return (
        <div className={"container-view"}>
            <div className={"row"}>
                <div className={"setting_main-menu col-lg-3 col-md-3 col-sm-12 col-xs-12"}>
                    <Card className="h-[calc(100vh-7rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
                                                       onClick={handleOpenRentHistory}> Danh sách đơn của bạn</i>
                                                </ListItem>
                                                {loggingUser.status !== 0 &&
                                                    <ListItem>
                                                        <i className="bi bi-card-checklist icon-hover"
                                                           onClick={handleOpenUserRentHistory}> Danh sách đơn đã
                                                            thuê</i>
                                                    </ListItem>
                                                }
                                                <ListItem>
                                                    <i className="bi bi-eye icon-hover"
                                                       onClick={handleOpenTop3Renters}> Người thuê nhiều nhất</i>
                                                </ListItem>
                                                <ListItem>
                                                    <i className="bi bi-eye icon-hover"
                                                       onClick={handleOpenTop3RecentRenters}> Người thuê gần
                                                        nhất</i>
                                                </ListItem>
                                                <ListItem>
                                                    <i className="bi bi-piggy-bank icon-hover" onClick={handleOpenChart}> Doanh
                                                        thu</i>
                                                </ListItem>


                                            </List>
                                        )}
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
                                            <i className="bi bi-credit-card-2-back icon-hover"
                                               onClick={handleOpenWithdraw}> Rút tiền</i>
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
                        </List>
                    </Card>
                </div>
                {showChart && <RevenueChart/>}
                <div className={"col-lg-9"} style={{width: "70%"}}>
                    {showRentHistory && <ViewRent/>}
                    {showUserRentHistory && <ViewUserRent/>}
                    {showTop3Renters && <Top3Rents selectedUserId={id}/>}
                    {showTop3RecentRenters && <Top3RecentRenters selectedUserId={id}/>}
                    {showWithdraw && <WalletInfo/>}
                </div>
            </div>
        </div>
    );
}
