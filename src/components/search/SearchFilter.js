import React, { useEffect, useState } from "react";
import { Popover, Button, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import axios from "axios";

const SearchFilter = () => {
    const [address, setAddress] = useState([]);
    const [searchForm, setSearchForm] = useState({
        gender: "",
        address: "",
        status:"",
        viewCountOrder: "",
        rentCountOrder: "",
        name: "",
        ageRange:"",
    });
    const [searchResult, setSearchResult] = useState([]);

    const changeSearch = (event) => {
        const { name, value } = event.target;
        setSearchForm((prevSearchForm) => ({
            ...prevSearchForm,
            [name]: value,
        }));
    };

    const handleAgeChange = (event) => {
        const { name, value } = event.target;
        setSearchForm((prevSearchForm) => ({
            ...prevSearchForm,
            ageRange: [
                name === "minAge" ? +value : prevSearchForm.ageRange[0],
                name === "maxAge" ? +value : prevSearchForm.ageRange[1],
            ],
        }));
    };
    const handleSearch = () => {
        const {
            gender,
            address,
            status,
            viewCountOrder,
            rentCountOrder,
            name,
            ageRange,
        } = searchForm;

        const params = {};

        if (gender) {
            params.gender = gender;
            console.log(gender);
        }

        if (address) {
            params.addressId = address;
            console.log(address);
        }
        if (status === "1") {
            params.status = 1;
        } else if (status === "0") {
            params.status = 0;
        }

        if (viewCountOrder === "1") {
            params.viewCountOrder = 1;
        } else if (viewCountOrder === "0") {
            params.viewCountOrder = -1;
        }

        if (viewCountOrder === "1") {
            params.viewCountOrder = 1;
        } else if (viewCountOrder === "0") {
            params.viewCountOrder = -1;
        }

        if (rentCountOrder === "1") {
            params.rentCountOrder = 1;
        } else if (rentCountOrder === "0") {
            params.rentCountOrder = -1;
        }

        if (ageRange[0] != null) {
            params.minAge = ageRange[0];
            console.log(ageRange[0]);
        }

        if (ageRange[1] != null) {
            params.maxAge = ageRange[1];
            console.log(ageRange[1]);
        }

        if (name) {
            params.username = name;
            console.log(name);
        }

        axios
            .get("http://localhost:8080/api/filter/search", {
                params: params,
            })
            .then((response) => {
                console.log(response.data);
                setSearchResult(response.data);
            })
            .catch((error) => {
                console.error("Error searching users:", error);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/addresses")
            .then((response) => {
                setAddress(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving addresses:", error);
            });
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <label htmlFor="gender">Giới tính:</label>
                <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={searchForm.gender}
                    onChange={changeSearch}
                >
                    <option value="">Tất cả</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="address">Địa chỉ:</label>
                <select
                    className="form-select"
                    id="address"
                    name="address"
                    value={searchForm.address}
                    onChange={changeSearch}
                >
                    <option value="">Tất cả</option>
                    {address.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="status">Trạng thái:</label>
                <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={searchForm.status}
                    onChange={changeSearch}
                >
                    <option value="">Tất cả</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="0">Không hoạt động</option>
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="viewCountOrder">Lượt xem:</label>
                <select
                    className="form-select"
                    id="viewCountOrder"
                    name="viewCountOrder"
                    value={searchForm.viewCountOrder}
                    onChange={changeSearch}
                >
                    <option value="">Tất cả</option>
                    <option value="1">Tăng dần</option>
                    <option value="0">Giảm dần</option>
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="rentCountOrder">Lượt thuê:</label>
                <select
                    className="form-select"
                    id="rentCountOrder"
                    name="rentCountOrder"
                    value={searchForm.rentCountOrder}
                    onChange={changeSearch}
                >
                    <option value="">Tất cả</option>
                    <option value="1">Tăng dần</option>
                    <option value="0">Giảm dần</option>
                </select>
            </div>

            <div className="col-md-4">
                <label htmlFor="minAge">Tuổi:</label>
                <div className="row">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="minAge"
                            name="minAge"
                            value={searchForm.ageRange[0]}
                            onChange={handleAgeChange}
                            placeholder="Từ"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            id="maxAge"
                            name="maxAge"
                            value={searchForm.ageRange[1]}
                            onChange={handleAgeChange}
                            placeholder="Đến"
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <label htmlFor="name">Tên người dùng:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={searchForm.name}
                    onChange={changeSearch}
                />
            </div>

            <div className="col-md-4">
                <label>&nbsp;</label>
                <button className="btn btn-primary" onClick={handleSearch}>
                    Tìm kiếm
                </button>
            </div>

            <div className="col-12">
                <h4>Kết quả tìm kiếm:</h4>
                {searchResult.map((user) => (
                    <div key={user.id}>{user.username}</div>
                ))}
            </div>
        </div>
    );
};

export default SearchFilter;





