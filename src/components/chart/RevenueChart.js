import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function RevenueChart() {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const id = loggingUser.id
    const currentYear = new Date().getFullYear();
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Doanh thu theo tháng',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'vnđ/tháng',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgb(255, 99, 132)',
            }
        ],
    })


    const [years, setYears] = useState([]);
    useEffect(() => {
        const yearArray = []
        for (let i = currentYear - 10; i <= currentYear; i++) {
            yearArray.push(i)
        }
        setYears(yearArray);
        handleOnchange();
    }, [])


    const handleOnchange = (evt) => {
        let year = currentYear;
        if (evt) {
            year = (evt.target.value);
        }
        axios.get(`http://localhost:8080/api/bookings/revenue/${id}?year=${year}`)
            .then(response => {
                setData({
                    ...data, datasets: [{
                        label: 'vnđ/tháng',
                        data: response.data,
                        backgroundColor: 'rgb(255, 99, 132)',
                    }]
                })
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    };




    return (
        <>
            <div className={`col-md-9 revenue-container`}>
                <div className={`row revenue-title`}>
                    <div className={`col-md-8`}>
                        <p>THỐNG KÊ</p>
                    </div>
                    <div className={`col-md-4 year-title`}>
                        <div style={{paddingTop: 5}}>
                            <span>Năm</span>
                        </div>
                        <div className={`select-year`}>

                            <select className={`form-select`}
                                    onChange={handleOnchange}>
                                {years.map((year) =>
                                    <option className={"text-success"} key={year} value={year} selected={year === currentYear} >
                                        {year}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <Bar options={options} data={data}/>
            </div>
        </>


    )

}