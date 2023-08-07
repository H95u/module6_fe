import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import axios from "axios";

export default function Sidebar(props) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/options`).then((response) => {
            setOptions(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const handleSelect = (e) => {
        props.onSearch(e.target.dataset.value);
    };

    return (
        <>
            <div className={"home-flex-category"}>
                <div className={"fixed-case"}>
                    <p>
                        <span className={"list-name font-bold text-danger"}>Danh mục dịch vụ</span>
                    </p>
                    <ul className={"list-group"} onClick={handleSelect}>
                        {options.map(item => (
                            <li key={item.id} data-value={item.id} className={"list-item"}>
                                <div className={"media"}>
                                    <div className={"media-body media-middle"}>
                                        <p data-value={item.id} className={"text-black"}>{item.name}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
