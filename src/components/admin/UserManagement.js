import {ChevronUpDownIcon, MagnifyingGlassIcon,} from "@heroicons/react/24/outline";
import {PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    IconButton,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import axios from "axios";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Report",
        value: "monitored",
    },

];

const TABLE_HEAD = ["Người dùng", "Vai trò", "Trạng thái", "Ngày tham gia", "Trạng thái", "Thao tác", "khóa tài khoản"];

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
    const getUsers = () => {
        try {
            axios.get(`http://localhost:8080/api/users/all`).then((response) => {
                setUsers(response.data);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);

    const handlePageClick = () => {
        const nextPage = currentPage + 1;
        if (nextPage < totalPages) {
            setCurrentPage(nextPage);
        }
    };
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users.slice(startIndex, endIndex);

    const handleToggleLock = async (accountId, prevLocked) => {
        try {
            const endpoint = prevLocked ? 'unlock' : 'lock';
            const response = await axios.put(`http://localhost:8080/api/auth/${endpoint}/${accountId}`);
            const updatedUsers = users.map(user =>
                user.id === accountId ? {...user, locked: response.data.locked} : user
            );

            setUsers(updatedUsers);
            setNotification(`Account ${response.data.locked ? 'locked' : 'unlocked'} successfully`);
            setTimeout(() => {
                setNotification('');
            }, 3000);

            getUsers().then();
        } catch (error) {
            console.error(`Error ${prevLocked ? 'unlocking' : 'locking'} account:`, error);
        }
    };

    return (
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
                            {TABS.map(({label, value}) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Tìm kiếm"
                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={head}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head}{" "}
                                    {index !== TABLE_HEAD.length - 1 && (
                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4"/>
                                    )}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageData.map(
                        ({id, img, username, email, status, createdDate, locked}, index) => {
                            const isLast = index === currentPageData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={username}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={img} alt={username} size="sm"/>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {username}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={status}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {status === 0 ? "Người dùng" : "Người CCDV"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={status === 1 ? "online" : "offline"}
                                                color={status === 1 ? "green" : "blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {createdDate}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <span style={{color: locked ? 'red' : 'green'}}>
                                            {locked ? 'Tài khoản đang bị khóa' : 'Tài khoản bình thường'}
                                        </span>
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4"/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td className={classes}>
                                        <div
                                            className={`relative w-12 h-6 rounded-full ${
                                                locked ? 'bg-red-600' : 'bg-gray-300'
                                            }`}
                                            onClick={() => handleToggleLock(id, locked)}
                                        >
                                            <div
                                                className={`absolute inset-0 w-6 h-6 bg-white rounded-full transform ${
                                                    locked ? 'translate-x-full' : ''
                                                }`}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Trang {currentPage + 1} / {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={currentPage === totalPages - 1}
                            onClick={handlePageClick}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}