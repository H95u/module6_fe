import React, {useEffect, useState} from "react";
import {Popover, Button, PopoverHandler, PopoverContent} from "@material-tailwind/react";
import axios from "axios";

const Filter = (props) => {

    const [address, setAddress] = useState([]);

    const [filterForm, setFilterForm] = useState(props.filterForm);
    const [minAge, setMinAge] = useState(props.filterForm.ageRange[0]);
    const [maxAge, setMaxAge] = useState(props.filterForm.ageRange[1]);

    const changeSearch = (event) => {
        const {name, value} = event.target;
        setFilterForm((prevSearchForm) => ({
            ...prevSearchForm,
            [name]: value,
        }));
    };

    const handleAgeChange = (event) => {
        const {name, value} = event.target;
        const newValue = +value;

        if (name === "minAge") {
            setMinAge(newValue);
            setFilterForm((prevSearchForm) => ({
                ...prevSearchForm,
                ageRange: [newValue, prevSearchForm.ageRange[1]],
            }));
        } else if (name === "maxAge") {
            setMaxAge(newValue);
            setFilterForm((prevSearchForm) => ({
                ...prevSearchForm,
                ageRange: [prevSearchForm.ageRange[0], newValue],
            }));
        }
    };

    const handleFilter = () => {
        props.onFilter(filterForm)
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/addresses`).then((response) => {
            setAddress(response.data);
        })
    }, [])

    return (
        <div className="row">
            <div className={"col-md-2 w-36"}>
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

            <div className={"col-md-2 w-26"}>
                <Popover placement="bottom">
                    <PopoverHandler>
                        <Button color="green"
                                size={"sm"}
                                variant="outlined"
                                className={"p-2.5"}
                        >
                            Tuổi ({minAge} - {maxAge})
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
                                max="59"
                                value={minAge}
                                onChange={handleAgeChange}
                            />
                            <span>{minAge}</span>
                            &ensp;
                            <label htmlFor="maxAge" className="form-label">
                                Đến :
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="maxAge"
                                name="maxAge"
                                min="19"
                                max="60"
                                value={maxAge}
                                onChange={handleAgeChange}
                            />
                            <span>{maxAge}</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="col-md-2">
                <Button color="red"
                        size={"sm"}
                        variant="gradient"
                        className={"p-2.5"}
                        onClick={handleFilter}
                >
                   Tìm kiếm
                </Button>
            </div>
        </div>
    );
}

export default Filter;

