import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Banner from "../banner/Banner";
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
    const [users, setUsers] = useState([]);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const getUsers = () => {
        axios.get(`http://localhost:8080/api/users`).then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = users.slice(startIndex, endIndex);

    return (
        <div className={"content"}>
            <div className={"container"}>
                <Banner/>
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
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {item.username}
                                        </Typography>
                                        <Typography>
                                            {item.price}
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <Button>Thuê ngay</Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </div>
                    ))}
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
