import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
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


export default function Content() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameSearch = searchParams.get("name");
    const [users, setUsers] = useState([]);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        if (!nameSearch) {
            getUsers();
        } else {
            searchStudentsByName(nameSearch)
            window.location.href = "#partner-list"
        }
    }, [nameSearch]);
    const searchStudentsByName = (nameSearch) => {
        const filteredUsers = users.filter((user) => {
            return user.username.toUpperCase().includes(nameSearch.toUpperCase());
        });
        setUsers(filteredUsers);
    };

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users.slice(startIndex, endIndex);

    return (
        <div className={"content"} style={{margin: 0, padding: 0}}>
            <div className={"container"}>
                <Banner/>
                <Story/>
                <Typography variant="h3" color="red" className="mb-8 text-center" textGradient>
                    Danh sách hot girl, hot boy
                </Typography>
                <div id={"partner-list"}>
                    <div className={"row"}>
                        {currentPageData.map((item) => (
                            <div className={"col-md-3"} key={item.id}>
                                <Link to={`/user/${item.id}`}>
                                    <Card className={"card"}>
                                        <CardHeader color="blue-gray" className="relative h-60">
                                            <img
                                                src={item.img}
                                                alt="card-image"
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <Typography color="blue" className="font-medium" textGradient>
                                                {item.nickname}
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
                </div>
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
    );
}
