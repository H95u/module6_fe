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
                    <p className={"ml-4 text-center"}>
                        <span className={"list-name font-bold text-danger"}>Danh mục dịch vụ</span>
                    </p>
                    <ul className={"list-group"} onClick={handleSelect}>
                        {options.map(item => (
                            <li key={item.id} data-value={item.id} className={"list-item ml-2.5"}>
                                <div className={"media"}>
                                    <div className={"media-left"}>
                                        <img className={"sidebar-image mt-2"} src={`banner/${item.image}`} alt=""/>
                                    </div>
                                    <div className={"media-body media-middle"}>
                                        <p data-value={item.id} className={"text-black service-name"}>{item.name}</p>
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
