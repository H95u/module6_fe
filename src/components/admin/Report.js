import React, {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, CardBody, CardFooter, Chip, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import {BackwardIcon, ForwardIcon} from "@heroicons/react/20/solid";

const TABLE_HEAD = ["Người báo cáo", "Người bị báo cáo", "Lý do", "Ngày báo cáo", "Thao tác"];
export default function Report() {
    const [allReport, setAllReport] = useState([]);
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const getReports = () => {
        axios.get(`http://localhost:8080/api/reports`).then((response) => {
            console.log(response.data)
            setAllReport(response.data);
        });
    };
    useEffect(() => {
        getReports();
    }, []);

    const handleChangePage = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(allReport.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = allReport.slice(startIndex, endIndex);
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
                    {currentPageData.map(
                        (item, index) => {
                            const isLast = index === currentPageData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item.username}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={item.accuser.img} alt={item.accuser.username} size="sm"/>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.accuser.username}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={item.accused.img} alt={item.accused.username} size="sm"/>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.accused.username}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.description}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.reportTime}
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
                        previousLabel={<BackwardIcon className="h-4 w-4"/>}
                        nextLabel={<ForwardIcon className="h-4 w-4"/>}
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