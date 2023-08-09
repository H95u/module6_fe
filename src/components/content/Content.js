import {useEffect, useState} from "react";
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
    Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import "./Content.css"
import Sidebar from "../sidebar/Sidebar";
import Filter from "../filter/Filter";
import Message from "../message/Message";


export default function Content() {
    const [users, setUsers] = useState([]);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };
    const [optionId, setOptionId] = useState("");

    const [filterForm, setFilterForm] = useState({
        gender: "",
        address: "",
        viewCount: "",
        rentCount: "",
        name: "",
        ageRange: [18, 60],
    });
    const filterHandle = (filterForm) => {
        console.log(filterForm);

        const filterDTO = {
            gender: filterForm.gender,
            addressId: filterForm.address,
            viewCount: filterForm.viewCount,
            rentCount: filterForm.rentCount,
            ageRange: filterForm.ageRange,
            username: filterForm.name,
        };

        axios.post('http://localhost:8080/api/filter', filterDTO)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const searchByOption = (optionId) => {
        console.log(optionId);
        axios.post(`http://localhost:8080/api/filter/option/${optionId}`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getUsers();
    }, [filterForm, optionId]);
    const searchStudentsByName = (nameSearch) => {
        axios.get(`http://localhost:8080/api/users/search?username=${nameSearch}`).then((response) => {
            if (response.status !== 204) {
                setUsers(response.data);
            } else {
                setUsers([]);
                Swal.fire({
                    title: "Không tìm thấy!",
                    icon: "error",
                })
            }
        });
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users.slice(startIndex, endIndex);

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
                    <Typography variant="h3" color="red" className="mb-8" textGradient>
                        Danh sách hot girl, hot boy
                    </Typography>
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
                                                    <Typography color="blue" className="font-medium" textGradient>
                                                        {item.username}
                                                    </Typography>
                                                    <Typography color="blue" className="font-medium" textGradient>
                                                        {item.price}
                                                    </Typography>
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
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
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
