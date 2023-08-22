import React, {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, CardBody, CardFooter, Chip, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import {useLocation} from "react-router-dom";
import {BackwardIcon, ForwardIcon} from "@heroicons/react/20/solid";

const TABLE_HEAD = ["Người dùng", "Vai trò", "Trạng thái", "Ngày tham gia", "Trạng thái tài khoản", "Khóa tài khoản"];
export default function AllUser() {
    const [allUsers, setAllUsers] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const [notification, setNotification] = useState('');

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users/all`).then((response) => {
            setAllUsers(response.data);
        });
    };

    const searchUser = () => {
        setAllUsers([]);
        axios.get(`http://localhost:8080/api/users/search?username=${name}`).then((response) => {
            setAllUsers(response.data);
            setCurrentPage(0);
        });
    };

    useEffect(() => {
        if (name !== null) {
            searchUser();
        } else {
            getUsers();
        }
    }, [name]);

    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = allUsers.slice(startIndex, endIndex);

    const handleChangePage = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const classes = "p-3 border-b border-blue-gray-50";


    const handleToggleLock = async (accountId, prevLocked) => {
        try {
            const endpoint = prevLocked ? 'unlock' : 'lock';
            const response = await axios.put(`http://localhost:8080/api/auth/${endpoint}/${accountId}`);
            const updatedUsers = allUsers.map(user =>
                user.id === accountId ? {...user, locked: response.data.locked} : user
            );

            setAllUsers(updatedUsers);
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
        <>
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-center">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageData.length === 0 ?
                        <h1 className={"text-center"}>Không tìm thấy</h1> : currentPageData.map(
                            (item, index) => (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex mx-auto justify-center items-center gap-3">
                                            <Avatar src={item.img} alt={item.username} size="sm"/>
                                            <div className="flex flex-col text-center">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item.username}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {item.email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.status === 0 ? "Người dùng" : "Người CCDV"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max mx-auto">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={item.status === 1 ? "online" : "offline"}
                                                color={item.status === 1 ? "green" : "blue-gray"}
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.createdDate}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <span style={{color: item.locked ? 'red' : 'green'}}>
                                            {item.locked ? 'Tài khoản đang bị khóa' : 'Tài khoản bình thường'}
                                        </span>
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div
                                            className={`relative w-12 h-6 rounded-full ml-24 ${
                                                item.locked ? 'bg-red-600' : 'bg-gray-300'
                                            }`}
                                            onClick={() => handleToggleLock(item.id, item.locked)}
                                        >
                                            <div
                                                className={`absolute inset-0 w-6 h-6 bg-white rounded-full transform ${
                                                    item.locked ? 'translate-x-full' : ''
                                                }`}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Trang {currentPage + 1} / {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <ReactPaginate
                        previousLabel={<BackwardIcon className="h-5 w-5"/>}
                        nextLabel={<ForwardIcon className="h-5 w-5"/>}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        onPageChange={handleChangePage}
                        activeClassName={"active"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                    />
                </div>
            </CardFooter>
        </>
    )
}