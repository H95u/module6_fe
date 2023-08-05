import React, {useEffect, useState} from "react";
import {Popover, Button, PopoverHandler, PopoverContent} from "@material-tailwind/react";
import axios from "axios";

const Filter = (props) => {

    const [address, setAddress] = useState([]);

    const [searchForm, setSearchForm] = useState({
        gender: "",
        address: "",
        viewCount: "",
        rentCount: "",
        name: "",
        ageRange: [18, 60],
    });

    const changeSearch = (event) => {
        const {name, value} = event.target;
        setSearchForm((prevSearchForm) => ({
            ...prevSearchForm,
            [name]: value,
        }));
    };

    const handleAgeChange = (event) => {
        const {name, value} = event.target;
        setSearchForm(prevSearchForm => ({
            ...prevSearchForm,
            ageRange: [
                name === "minAge" ? +value : prevSearchForm.ageRange[0],
                name === "maxAge" ? +value : prevSearchForm.ageRange[1],
            ],
        }));
    };

    const handleSearch = () => {
        console.log(searchForm)
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/addresses`).then((response) => {
            setAddress(response.data);
        })
    }, [])

    return (
        <div className="row">
            <div className={"col-md-4 w-36"}>
                <select className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"gender"}
                >
                    <option value="" selected>Giới tính</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
            <div className={"col-md-2 w-32"}>
                <select className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"address"}
                >
                    <option value="" selected>Địa chỉ</option>
                    {address.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className={"col-md-2 w-36"}>
                <select className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"viewCount"}
                >
                    <option value="" selected>Lượt xem</option>
                    <option value="1">Tăng dần</option>
                    <option value="0">Giảm dần</option>
                </select>
            </div>

            <div className={"col-md-2 w-36"}>
                <select className="form-select"
                        aria-label="Default select example"
                        onChange={changeSearch}
                        name={"rentCount"}
                >
                    <option value="" selected>Lượt thuê</option>
                    <option value="1">Tăng dần</option>
                    <option value="0">Giảm dần</option>
                </select>
            </div>

            <div className={"col-md-2 w-24"}>
                <Popover placement="bottom">
                    <PopoverHandler>
                        <Button color="light-green"
                                size={"sm"}
                                variant="gradient"
                        >
                            Tuổi
                        </Button>
                    </PopoverHandler>
                    <PopoverContent className="w-72">
                        <div>
                            <input
                                type="range"
                                className="form-range"
                                id="minAge"
                                name="minAge"
                                min="18"
                                max="60"
                                value={searchForm.ageRange[0]}
                                onChange={handleAgeChange}
                            />
                            <span>{searchForm.ageRange[0]}</span>

                            <label htmlFor="maxAge" className="form-label">
                                Đến:
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="maxAge"
                                name="maxAge"
                                min="18"
                                max="60"
                                value={searchForm.ageRange[1]}
                                onChange={handleAgeChange}
                            />
                            <span>{searchForm.ageRange[1]}</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className={"col-md-2"}>
                <input type="text" className="form-control" placeholder={"Tên"} name={"name"} onChange={changeSearch}/>
            </div>
            <div className="col-md-2">
                <Button
                    color="red"
                    size={"sm"}
                    variant="gradient"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
}

export default Filter;