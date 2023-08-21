import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Report from "./Report";
import AllUser from "./AllUser";
import {useNavigate} from "react-router-dom";

export default function UserManagement() {
    const navigate = useNavigate();
    const handleShowAll = () => {
        setShowAllUser(true);
    };
    const handleShowAllReport = () => {
        setShowAllUser(false);
    };

    const TABS = [
        {
            label: "Tất cả",
            value: "all",
            handler: handleShowAll,
        },
        {
            label: "Report",
            value: "monitored",
            handler: handleShowAllReport,
        },

    ];

    const [showAllUser, setShowAllUser] = useState(true);
    const [searchInputValue, setSearchInputValue] = useState("");

    const handleInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };
    const handleSubmitSearch = (event) => {
        if (event.key === 'Enter') {
            navigate(`/management?name=${searchInputValue}`);
        }
    };


    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Danh sách người dùng
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Quản lý thông tin tất cả người dùng
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" size="sm">
                                view all
                            </Button>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4"/> Add member
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({label, value, handler}) => (
                                    <Tab key={value} value={value}
                                         onClick={() => handler()}
                                    >
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Tìm kiếm"
                                icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                onChange={handleInputChange}
                                onKeyDown={handleSubmitSearch}
                            />
                        </div>
                    </div>
                </CardHeader>
                {showAllUser ?
                    <AllUser/> : <Report/>
                }
            </Card>
        </>
    )
}