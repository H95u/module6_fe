import {IconButton, Spinner, Tooltip, Typography} from "@material-tailwind/react";
import {CurrencyDollarIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function WalletInfo() {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const id = loggingUser.id;
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${id}`).then(response => {
            setUser(response.data)
        }).catch(error => {
            console.error("Error fetching bookings:", error);
        });
    }, [id]);

    function formatPrice(price) {
        // Chuyển giá thành chuỗi và thêm dấu phẩy sau mỗi 3 chữ số từ bên phải
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleSubmitWithdraw = async () => {
        const {value: email} = await Swal.fire({
            title: 'Nhập email nhận tiền',
            input: 'email',
            inputLabel: 'Email nhận tiền paypal',
            inputPlaceholder: 'Nhập vào email nhận tiền paypal'
        })

        if (email) {
            const {value: amount} = await Swal.fire({
                title: 'Nhập số tiền muốn rút ',
                input: 'number',
                inputPlaceholder: 'Nhập vào số tiền muốn rút !!'
            })
            if (amount) {
                if (amount > user.money) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Số tiền quá lớn !!',
                    })
                } else if (amount < 500000) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Bạn phải rút trên 500k !!',
                    })
                } else {
                    setLoading(true)
                    axios.post(`http://localhost:8080/api/paypal/withdraw/${id}?amount=${amount}&email=${email}`).then((response) => {
                        setLoading(false);
                        if (response.status === 200) {
                            setUser(response.data);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Rút tiền thành công !!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Rút tiền thất bại !!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    });
                }
            }
        }

    }


    if (loading) {
        return (
            <>
                <div className="flex h-screen items-center justify-center">
                    <Spinner className="h-32 w-32 p-2 mb-32" color="pink"/>
                    <p className={"mb-32"}>Đang rút tiền...</p>
                </div>

            </>
        )
    }

    return (
        <>

            <div className={"row"}>
                <div className={"col-md-7"}>
                    <div className={"col-md-10 p-4 ml-10"}>
                        <Typography color={"red"} className={"mb-4 text-center"} variant={"h3"}>
                            Thông tin ví của bạn
                        </Typography>
                        <table className={"table border wallet-info"}>
                            <tbody>
                            <tr>
                                <td>
                                    <Typography className={"italic"} variant={"h3"}>Cổng thanh toán :</Typography>
                                    <p className={"mt-2"}>
                                        Paypal
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography className={"italic"} variant={"h3"}>Chủ tài khoản:</Typography>
                                    <p className={"mt-2"}>
                                        {user.gender === 1 ? "Nguyễn Văn" : "Trần Thị"} {user.nickname}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography className={"italic"} variant={"h3"}>Số dư trong tài
                                        khoản:</Typography>
                                    <p className={"mt-2"}>
                                        {formatPrice(user.money)}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography className={"italic"} variant={"h3"}>Số tài khoản:</Typography>
                                    <p className={"mt-2"}>
                                        123456789
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className={"text-center"}>
                                    <Tooltip content="Rút tiền">
                                        <IconButton
                                            variant="text" color="yellow"
                                            className={"bg-white"}
                                            onClick={handleSubmitWithdraw}
                                        >
                                            <CurrencyDollarIcon className="h-10 w-10"/>
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className={"col-md-5"}>
                    <img src={"/banner/thantai.jpg"} className={"pig-img mt-4"}/>
                </div>
            </div>
        </>
    )
}