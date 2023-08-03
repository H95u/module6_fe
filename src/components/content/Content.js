import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "../banner/Banner";
import ReactPaginate from "react-paginate";

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
                <Banner />
                <div className={"row"}>
                    {currentPageData.map((item) => (
                        <div className={"col-md-3"} key={item.id}>
                            <Link to={`/user/${item.id}`}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img
                                        style={{ height: "250px" }}
                                        src={item.img}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.username}</h5>
                                        <p className="card-text">{item.price} / giờ</p>
                                    </div>
                                </div>
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
