import React, {useState} from "react";
import {Select, Option, Input} from "@material-tailwind/react";

const Filter = (props) => {

    const [search, setSearch] = useState(props.keyword);

    const changeSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleSearch = () => {
        props.onSearch(search); // Call the onSearch function passed via props
    };

    return (
        <div className={"container"}>
            <div className="row">
                <div className={"col-md-4 w-36"}>
                    <select className="form-select" aria-label="Default select example">
                        <option value="" selected>Giới tính</option>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>
                </div>

                <div className={"col-md-3 w-36"}>
                    <select className="form-select" aria-label="Default select example">
                        <option value="" selected>Địa chỉ</option>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>
                </div>

                <div className={"col-md-3 w-36"}>
                    <select className="form-select" aria-label="Default select example">
                        <option value="" selected>Lượt xem</option>
                        <option value="1">Tăng dần</option>
                        <option value="0">Giảm dần</option>
                    </select>
                </div>

                <div className={"col-md-3 w-36"}>
                    <select className="form-select" aria-label="Default select example">
                        <option value="" selected>Lượt thuê</option>
                        <option value="1">Tăng dần</option>
                        <option value="0">Giảm dần</option>
                    </select>
                </div>
                <div className={"col-md-2 w-32"}>
                <input type="text" className="form-control" placeholder={"Tên"}/>
                </div>
            </div>
        </div>
    );
}

export default Filter;