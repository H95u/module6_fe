import React, {useEffect, useState} from "react";
import {Button} from "@material-tailwind/react";
import axios from "axios";

const Filterss = () => {
    const [addressList, setAddressList] = useState([]);
    const [searchForm, setSearchForm] = useState({
        gender: null,
        address: null,
        viewCount:null,
        rentCount: null,
        minAge: 18,
        maxAge: 25,
        username: "",
    });
    const [searchResult, setSearchResult] = useState([]);

    const changeSearch = (event) => {
        // const {name, value} = event.target;
        // setSearchForm((prevSearchForm) => ({
        //     ...prevSearchForm,
        //     [name]: value,
        // }));
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
    };

    const handleAgeChange = (event) => {
        // const {name, value} = event.target;
        // setSearchForm((prevSearchForm) => ({
        //     ...prevSearchForm,
        //     [name]: +value,
        // }));
        const { name, value } = event.target;
        setSearchForm((prevSearchForm) => ({
            ...prevSearchForm,
            [name]: value === "" ? null : parseInt(value),
        }));

    };
    const handleSearch = () => {
        const params = {
            gender: searchForm.gender === "1" ? 1 : searchForm.gender === "2" ? 2 : null,
            address: searchForm.address !== "" ? parseInt(searchForm.address) : null,
            viewCount: searchForm.viewCount !== "" ? parseInt(searchForm.viewCount) : null,
            rentCount: searchForm.rentCount !== "" ? parseInt(searchForm.rentCount) : null,
            minAge: searchForm.minAge !== "" ? parseInt(searchForm.minAge) : null,
            maxAge: searchForm.maxAge !== "" ? parseInt(searchForm.maxAge) : null,
            username: searchForm.username?.trim() || null,
            img: searchForm.img?.trim() || null,
        };
        axios
            .get("http://localhost:8080/api/users/filter", {
                params: params,
            })
            .then((response) => {
                console.log(response.data);
                setSearchResult(response.data);
                alert("Tìm kiếm thành công!");
            })
            .catch((error) => {
                console.error(error);
                alert("Đã xảy ra lỗi trong quá trình tìm kiếm.");
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/addresses")
            .then((response) => {
                setAddressList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <div className="row">
                <div className={"col-md-4 w-36"}>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"gender"}
                        value={searchForm.gender}
                    >
                        <option value="">Giới tính</option>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>
                </div>
                <div className={"col-md-2 w-32"}>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"address"}
                        value={searchForm.address}
                    >
                        <option value="">Địa chỉ</option>
                        {addressList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={"col-md-2 w-36"}>
                    <input
                        className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"viewCount"}
                        value={searchForm.viewCount}
                    />
                </div>

                <div className={"col-md-2 w-36"}>
                    <input
                        className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"rentCount"}
                        value={searchForm.rentCount}
                    />
                </div>
            </div>

            <div className="row mt-2">
                <div className={"col-md-3 w-48"}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tên người dùng"
                        name="username"
                        value={searchForm.username}
                        onChange={changeSearch}
                    />
                </div>

                <div className={"col-md-2 w-32"}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Tuổi tối thiểu"
                        name="minAge"
                        value={searchForm.minAge}
                        onChange={handleAgeChange}
                    />
                </div>

                <div className={"col-md-2 w-32"}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Tuổi tối đa"
                        name="maxAge"
                        value={searchForm.maxAge}
                        onChange={handleAgeChange}
                    />
                </div>
                <div className={"col-md-5 w-72"}>
                    <Button color="blue" ripple="light" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            {searchResult.length > 0 && (
                <div className="mt-4">
                    <ul>
                        {searchResult.map((item) => (
                            <li key={item.id}>
                                <p>Username: {item.username}</p>
                                <p>Address ID: {item.address}</p>
                                <p>View Count: {item.viewCount}</p>
                                <p>Rent Count: {item.rentCount}</p>
                                <p>Min Age: {item.age}</p>
                                <p>Gender: {item.gender}</p>
                                <img src={item.img} alt="User Image"/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {searchResult.length === 0 && searchForm.gender !== null && (
                <p>Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};

export default Filterss;
