// import React, { useEffect, useState } from "react";
// import {
//     Button,
// } from "@material-tailwind/react";
// import axios from "axios";
//
// const SearchFilter = () => {
//     const [address, setAddress] = useState([]);
//     const [searchForm, setSearchForm] = useState({
//         gender: "",
//         address: "",
//         viewCount: "",
//         rentCount: "",
//         name: "",
//         minAge: 18,
//         maxAge: 60,
//     });
//     const [searchResult, setSearchResult] = useState([]);
//
//     const changeSearch = (event) => {
//         const { name, value } = event.target;
//         setSearchForm((prevSearchForm) => ({
//             ...prevSearchForm,
//             [name]: value,
//         }));
//     };
//
//     const handleAgeChange = (event) => {
//         const { name, value } = event.target;
//         setSearchForm((prevSearchForm) => ({
//             ...prevSearchForm,
//             [name]: +value,
//         }));
//     };
//
//     const handleSearch = () => {
//         axios
//             .get("http://localhost:8080/api/users", {
//                 params: searchForm,
//             })
//             .then((response) => {
//                 console.log(response.data);
//                 const searchData = response.data;
//                 setSearchResult(searchData);
//                 alert("Tìm kiếm thành công!");
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };
//
//     useEffect(() => {
//         axios
//             .get("http://localhost:8080/api/addresses")
//             .then((response) => {
//                 setAddress(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <div className="row">
//                 <div className={"col-md-4 w-36"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"gender"}
//                         value={searchForm.gender}
//                     >
//                         <option value="">Giới tính</option>
//                         <option value="1">Nam</option>
//                         <option value="0">Nữ</option>
//                     </select>
//                 </div>
//                 <div className={"col-md-2 w-32"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"address"}
//                         value={searchForm.address}
//                     >
//                         <option value="">Địa chỉ</option>
//                         {address.map((item) => (
//                             <option key={item.id} value={item.id}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"viewCount"}
//                         value={searchForm.viewCount}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"rentCount"}
//                         value={searchForm.rentCount}
//                    />
//                 </div>
//             </div>
//
//             <div className="row mt-2">
//                 <div className={"col-md-3 w-48"}>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Tên người dùng"
//                         name="name"
//                         value={searchForm.name}
//                         onChange={changeSearch}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối thiểu"
//                         name="minAge"
//                         value={searchForm.minAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối đa"
//                         name="maxAge"
//                         value={searchForm.maxAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//                 <div className={"col-md-5 w-72"}>
//                     <Button color="blue" ripple="light" onClick={handleSearch}>
//                         Tìm kiếm
//                     </Button>
//                 </div>
//             </div>
//             {searchResult.length > 0 && (
//                 <div className="mt-4">
//                     <h3>Kết quả tìm kiếm:</h3>
//                     <ul>
//                         {searchResult.map((item) => (
//                             <li key={item.id}>
//                                 <p>Username: {item.username}</p>
//                                 <p>Address ID: {item.name}</p>
//                                 <p>View Count: {item.viewCount}</p>
//                                 <p>Rent Count: {item.rentCount}</p>
//                                 <p>Min Age: {item.age}</p>
//                                 <p>Gender: {item.gender}</p>
//                                 <img src={item.img} alt="User Image" />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default SearchFilter;

// import React, { useEffect, useState } from "react";
// import { Button } from "@material-tailwind/react";
// import axios from "axios";
//
// const SearchFilter = () => {
//     const [addressList, setAddressList] = useState([]);
//     const [searchForm, setSearchForm] = useState({
//         gender: "",
//         address: "",
//         viewCount: "",
//         rentCount: "",
//         minAge: 18,
//         maxAge: 30,
//         username: "",
//     });
//     const [searchResult, setSearchResult] = useState([]);
//
//     const changeSearch = (event) => {
//         const { name, value } = event.target;
//         setSearchForm((prevSearchForm) => ({
//             ...prevSearchForm,
//             [name]: value,
//         }));
//     };
//
//     const handleAgeChange = (event) => {
//         const { name, value } = event.target;
//         setSearchForm((prevSearchForm) => ({
//             ...prevSearchForm,
//             [name]: +value,
//         }));
//     };
//
//     const handleSearch = () => {
//         axios
//             .get("http://localhost:8080/api/users/filter", {
//                 params: {
//                     gender: searchForm.gender !== "" ? parseInt(searchForm.gender) : null,
//                     address: searchForm.address !== "" ? parseInt(searchForm.address) : null,
//                     viewCount: searchForm.viewCount !== "" ? parseInt(searchForm.viewCount) : null,
//                     rentCount: searchForm.rentCount !== "" ? parseInt(searchForm.rentCount) : null,
//                     minAge: searchForm.minAge !== "" ? parseInt(searchForm.minAge) : null,
//                     maxAge: searchForm.maxAge !== "" ? parseInt(searchForm.maxAge) : null,
//                     username: searchForm.username !== "" ? searchForm.username : null,
//                 },
//             })
//             .then((response) => {
//                 console.log(response.data);
//                 setSearchResult(response.data);
//                 alert("Tìm kiếm thành công!");
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };
//
//     useEffect(() => {
//         axios
//             .get("http://localhost:8080/api/addresses")
//             .then((response) => {
//                 setAddressList(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <div className="row">
//                 <div className={"col-md-4 w-36"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"gender"}
//                         value={searchForm.gender}
//                     >
//                         <option value="">Giới tính</option>
//                         <option value="1">Nam</option>
//                         <option value="0">Nữ</option>
//                     </select>
//                 </div>
//                 <div className={"col-md-2 w-32"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"address"}
//                         value={searchForm.address}
//                     >
//                         <option value="">Địa chỉ</option>
//                         {addressList.map((item) => (
//                             <option key={item.id} value={item.id}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"viewCount"}
//                         value={searchForm.viewCount}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"rentCount"}
//                         value={searchForm.rentCount}
//                     />
//                 </div>
//             </div>
//
//             <div className="row mt-2">
//                 <div className={"col-md-3 w-48"}>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Tên người dùng"
//                         name="username"
//                         value={searchForm.username}
//                         onChange={changeSearch}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối thiểu"
//                         name="minAge"
//                         value={searchForm.minAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối đa"
//                         name="maxAge"
//                         value={searchForm.maxAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//                 <div className={"col-md-5 w-72"}>
//                     <Button color="blue" ripple="light" onClick={handleSearch}>
//                         Tìm kiếm
//                     </Button>
//                 </div>
//             </div>
//             {searchResult.length > 0 && (
//                 <div className="mt-4">
//                     <h3>Kết quả tìm kiếm:</h3>
//                     <ul>
//                         {searchResult.map((item) => (
//                             <li key={item.id}>
//                                 <p>Username: {item.username}</p>
//                                 <p>Address ID: {item.address}</p>
//                                 <p>View Count: {item.viewCount}</p>
//                                 <p>Rent Count: {item.rentCount}</p>
//                                 <p>Min Age: {item.age}</p>
//                                 <p>Gender: {item.gender}</p>
//                                 <img src={item.img} alt="User Image" />
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default SearchFilter;



// import React, {useEffect, useState} from "react";
// import {Button} from "@material-tailwind/react";
// import axios from "axios";
//
// const SearchFilter = () => {
//     const [addressList, setAddressList] = useState([]);
//     const [searchForm, setSearchForm] = useState({
//         gender: null,
//         address: null,
//         viewCount:null,
//         rentCount: null,
//         minAge: 18,
//         maxAge: 25,
//         username: "",
//     });
//     const [searchResult, setSearchResult] = useState([]);
//
//     const changeSearch = (event) => {
//         // const {name, value} = event.target;
//         // setSearchForm((prevSearchForm) => ({
//         //     ...prevSearchForm,
//         //     [name]: value,
//         // }));
//         setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
//     };
//
//     const handleAgeChange = (event) => {
//         // const {name, value} = event.target;
//         // setSearchForm((prevSearchForm) => ({
//         //     ...prevSearchForm,
//         //     [name]: +value,
//         // }));
//         const { name, value } = event.target;
//         setSearchForm((prevSearchForm) => ({
//             ...prevSearchForm,
//             [name]: value === "" ? null : parseInt(value),
//         }));
//
//     };
//     const handleSearch = () => {
//         const params = {
//             gender: searchForm.gender === "1" ? 2 : searchForm.gender === "0" ? 1 : null,
//             address: searchForm.address !== "" ? parseInt(searchForm.address) : null,
//             viewCount: searchForm.viewCount !== "" ? parseInt(searchForm.viewCount) : null,
//             rentCount: searchForm.rentCount !== "" ? parseInt(searchForm.rentCount) : null,
//             minAge: searchForm.minAge !== "" ? parseInt(searchForm.minAge) : null,
//             maxAge: searchForm.maxAge !== "" ? parseInt(searchForm.maxAge) : null,
//             username: searchForm.username?.trim() || null,
//             img: searchForm.img?.trim() || null,
//         };
//         axios
//             .get("http://localhost:8080/api/users/filter", {
//                 params: params,
//             })
//             .then((response) => {
//                 console.log(response.data);
//                 setSearchResult(response.data);
//                 alert("Tìm kiếm thành công!");
//             })
//             .catch((error) => {
//                 console.error(error);
//                 alert("Đã xảy ra lỗi trong quá trình tìm kiếm.");
//             });
//     };
//
//     useEffect(() => {
//         axios
//             .get("http://localhost:8080/api/addresses")
//             .then((response) => {
//                 setAddressList(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <div className="row">
//                 <div className={"col-md-4 w-36"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"gender"}
//                         value={searchForm.gender}
//                     >
//                         <option value="">Giới tính</option>
//                         <option value="1">Nam</option>
//                         <option value="0">Nữ</option>
//                     </select>
//                 </div>
//                 <div className={"col-md-2 w-32"}>
//                     <select
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"address"}
//                         value={searchForm.address}
//                     >
//                         <option value="">Địa chỉ</option>
//                         {addressList.map((item) => (
//                             <option key={item.id} value={item.id}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"viewCount"}
//                         value={searchForm.viewCount}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-36"}>
//                     <input
//                         className="form-select"
//                         aria-label="Default select example"
//                         onChange={changeSearch}
//                         name={"rentCount"}
//                         value={searchForm.rentCount}
//                     />
//                 </div>
//             </div>
//
//             <div className="row mt-2">
//                 <div className={"col-md-3 w-48"}>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Tên người dùng"
//                         name="username"
//                         value={searchForm.username}
//                         onChange={changeSearch}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối thiểu"
//                         name="minAge"
//                         value={searchForm.minAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//
//                 <div className={"col-md-2 w-32"}>
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Tuổi tối đa"
//                         name="maxAge"
//                         value={searchForm.maxAge}
//                         onChange={handleAgeChange}
//                     />
//                 </div>
//                 <div className={"col-md-5 w-72"}>
//                     <Button color="blue" ripple="light" onClick={handleSearch}>
//                         Tìm kiếm
//                     </Button>
//                 </div>
//             </div>
//             {searchResult.length > 0 && (
//                 <div className="mt-4">
//                     <ul>
//                         {searchResult.map((item) => (
//                             <li key={item.id}>
//                                 <p>Username: {item.username}</p>
//                                 <p>Address ID: {item.address}</p>
//                                 <p>View Count: {item.viewCount}</p>
//                                 <p>Rent Count: {item.rentCount}</p>
//                                 <p>Min Age: {item.age}</p>
//                                 <p>Gender: {item.gender}</p>
//                                 <img src={item.img} alt="User Image"/>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             {searchResult.length === 0 && searchForm.gender !== null && (
//                 <p>Không tìm thấy kết quả phù hợp.</p>
//             )}
//         </div>
//     );
// };
//
// export default SearchFilter;

import React, {useEffect, useState} from "react";
import {Popover, Button, PopoverHandler, PopoverContent} from "@material-tailwind/react";
import axios from "axios";

const SearchFilter = (props) => {

    const [address, setAddress] = useState([]);

    const [searchForm, setSearchForm] = useState({
        gender: "",
        address: "",
        viewCount: "",
        rentCount: "",
        name: "",
        ageRange: [18, 60],
    });
    const [searchResult, setSearchResult] = useState([]);


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
        const {
            gender,
            address,
            viewCount,
            rentCount,
            minAge,
            maxAge,
            username,
            img
        } = searchForm;

        const params = {
            gender: gender === "1" ? 1 : gender === "2" ? 2 : null,
            address: address !== "" ? parseInt(address) : null,
            viewCount: viewCount === "0" ? 0 : viewCount === "1" ? 1 : null,
            rentCount: rentCount === "0" ? 0 : rentCount === "1" ? 1 : null,
            minAge: minAge !== "" && !isNaN(parseInt(minAge)) ? parseInt(minAge) : null,
            maxAge: maxAge !== "" && !isNaN(parseInt(maxAge)) ? parseInt(maxAge) : null,
            username: username?.trim() || null,
            img: img?.trim() || null
        };

        axios
            .get("http://localhost:8080/api/users/filter", {
                params: params
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
                setAddress(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
}

export default SearchFilter;
