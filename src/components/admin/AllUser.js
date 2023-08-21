import {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, CardBody, CardFooter, Chip, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import {useLocation} from "react-router-dom";

const TABLE_HEAD = ["Người dùng", "Vai trò", "Trạng thái", "Ngày tham gia", "Thao tác"];
export default function AllUser() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    const [allUsers, setAllUsers] = useState([]);
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users/all`).then((response) => {
            setAllUsers(response.data);
        });
    };

    const searchUser = () => {
        axios.get(`http://localhost:8080/api/users/search?username=${name}`).then((response) => {
            setAllUsers(response.data);
        });
    };

    useEffect(() => {
        if (name) {
            searchUser();
        } else {
            getUsers();
        }
    }, [name]);

    const handleChangePage = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = allUsers.slice(startIndex, endIndex);

    return (
        <>
            <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
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
                    {currentPageData.length > 0 && currentPageData.map(
                        (item, index) => {
                            const isLast = index === currentPageData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item.username}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={item.img} alt={item.username} size="sm"/>
                                            <div className="flex flex-col">
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
                                        <div className="w-max">
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
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4"/>
                                            </IconButton>
                                        </Tooltip>
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
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
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