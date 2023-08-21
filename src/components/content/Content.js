import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Banner from "../banner/Banner";
import Story from "../story/Story";
import ReactPaginate from "react-paginate";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import "./Content.css"
import Sidebar from "../sidebar/Sidebar";
import Filter from "../filter/Filter";
import Message from "../message/Message";
import {BackwardIcon, ForwardIcon} from "@heroicons/react/20/solid";


export default function Content() {
    const [users, setUsers] = useState([]);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);
    const [optionChoose, setOptionChoose] = useState("");

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };
    const [optionId, setOptionId] = useState("");

    const [filterForm, setFilterForm] = useState({
        gender: "",
        address: "",
        sortPrice: "",
        rentCount: "",
        name: "",
        ageRange: [18, 60],
    });
    const filterHandle = (filterForm) => {

        const filterDTO = {
            gender: filterForm.gender,
            addressId: filterForm.address,
            sortPrice: filterForm.sortPrice,
            ageRange: filterForm.ageRange,
        };

        axios.post('http://localhost:8080/api/filter', filterDTO)
            .then((response) => {
                setCurrentPage(0);
                setUsers(response.data);
                window.location.href = "#partner-list"
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const searchByOption = (optionId) => {
        axios.post(`http://localhost:8080/api/filter/option/${optionId}`)
            .then((response) => {
                const option = response.data[0].options.find(opt => opt.id == optionId);
                setOptionChoose(option);
                setUsers(response.data);
                window.location.href = "#partner-list"
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getUsers();
    }, [filterForm, optionId]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    function formatPrice(price) {
        // Chuyển giá thành chuỗi và thêm dấu phẩy sau mỗi 3 chữ số từ bên phải
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users.slice(startIndex, endIndex);

    function generateSearchTitle() {
        return <div className={"row"}>
            <div className={"col-lg-1"}>
                <img className={"h-10 w-10 mx-auto mt-8"} src={`/banner/${optionChoose.image}`}/>
            </div>
            <div className={"col-lg-11"}>
                <Typography variant="h3" color="pink" className="mb-10 mt-8" textGradient>
                    {optionChoose.name}
                </Typography>
            </div>
        </div>;
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-2"}>
                    <Sidebar optionId={optionId} onSearch={searchByOption}/>
                </div>
                <div className={"col-md-10 col-sm-1"}>
                        <Banner/>
                        <Story/>
                        <hr/>
                        <div className={"mb-8 pt-10"}>
                            <Filter filterForm={filterForm} onFilter={filterHandle}/>
                        </div>
                        <hr/>
                        {optionChoose != "" ?
                            generateSearchTitle()
                            :
                            <Typography variant="h3" color="red" className="mb-10 mt-8 ml-4" textGradient>
                                Danh sách hot girl, hot boy
                            </Typography>}
                        {users.length === 0 ?
                            "" :
                            <div id={"partner-list"}>
                                <div className={"row"}>
                                    {currentPageData.map((item) => (
                                        <div className={"col-md-3"} key={item.id}>
                                            <Link to={`/user/${item.id}`}>
                                                <Card className={"card w-56"}>
                                                    <CardHeader color="blue-gray" className="relative h-48">
                                                        <img
                                                            className={"object-cover w-full h-full"}
                                                            src={item.img}
                                                            alt="card-image"
                                                        />
                                                    </CardHeader>
                                                    <CardBody>
                                                        <div className={"mb-2"}>
                                                            <Typography color="blue" className="font-medium"
                                                                        textGradient>
                                                                Tên : {item.username}
                                                            </Typography>
                                                            <Typography color="red" className="font-medium"
                                                                        textGradient>
                                                                Giá : &#32; {formatPrice(item.price)} đ/h
                                                            </Typography>
                                                        </div>
                                                    </CardBody>
                                                    <CardFooter className="pt-0">
                                                        <Button color="red">Thuê ngay</Button>
                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                    <div>
                        <ReactPaginate
                            previousLabel={<BackwardIcon className="h-5 w-5"/>}
                            nextLabel={<ForwardIcon className="h-5 w-5"/>}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            onPageChange={handlePageClick}
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
                </div>
            </div>
            <div>
                <Message/>
            </div>
        </div>
    );
}
