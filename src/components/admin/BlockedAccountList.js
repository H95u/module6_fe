//                             <thead>
// //                             <tr>
// //                                 <th><span>Người Dùng</span></th>
// //                                 <th><span>Ngày sinh</span></th>
// //                                 <th><span>Email</span></th>
// //                                 <th><span>Giới tính</span></th>
// //                                 <th><span>Tuổi</span></th>
// //                                 <th className="text-center"><span>Trạng thái</span></th>
// //                                 <th className="text-center"><span>Khóa tài khoản</span></th>
// //                             </tr>
// //                             </thead>
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlockedAccountList.css';
import { Input, Switch, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const BlockedAccountList = () => {
    const [lockedAccounts, setLockedAccounts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showPopover, setShowPopover] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const maxResults = 5;

    useEffect(() => {
        fetchLockedAccounts();
        getUsers();
    }, []);

    const fetchLockedAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/locked-accounts');
            setLockedAccounts(response.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách tài khoản bị khóa:', error);
        }
    };

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách người dùng:', error);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setShowPopover(false);
        setSearchInputValue(user.username); // Update the input value to the selected user's username
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchInputValue(newValue);

        const results = users.filter((user) =>
            user.username.toLowerCase().includes(newValue.toLowerCase())
        );
        setAutocompleteResults(results.slice(0, maxResults));

        setShowPopover(newValue !== "" && results.length > 0);
    };
    const handleLockUnlock = async (accountId, isLocked) => {
        const endpoint = isLocked ? 'unlock' : 'lock';
        try {
            await axios.put(`http://localhost:8080/api/auth/${endpoint}/${accountId}`);

            if (isLocked) {
                setLockedAccounts(prevAccounts =>
                    prevAccounts.filter(account => account.id !== accountId)
                );
            } else {
                setLockedAccounts(prevAccounts =>
                    prevAccounts.map(account =>
                        account.id === accountId ? { ...account, locked: true } : account
                    )
                );
            }

            if (selectedUser && selectedUser.id === accountId) {
                setSelectedUser(prevUser => ({ ...prevUser, locked: !prevUser.locked }));
            }
        } catch (error) {
            console.error(`Lỗi khi ${isLocked ? 'mở khóa' : 'khóa'} tài khoản:`, error);
        }
    };

    return (
        <div className="col-lg-9">
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug bg-clip-text text-transparent bg-gradient-to-tr from-red-600 to-red-400 mb-8 mt-4 text-center">
                Danh sách tài khoản bị khóa
            </h4>
            <div className="relative flex w-full gap-96 md:w-max">
                <Input
                    id="search-input"
                    type="search"
                    label="Nhập tên..."
                    className="pr-20"
                    containerProps={{
                        className: "min-w-[288px]",
                    }}
                    value={searchInputValue}
                    onChange={handleInputChange}
                />
                {showPopover && (
                    <div className={"auto-complete"}>
                        <ul>
                            {autocompleteResults.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center"
                                    onMouseUp={() => handleUserSelect(user)}
                                >
                                    <img alt={"..."} className={"h-10 w-10 p-2 rounded-full"} src={user.img} />
                                    <p className="ml-4 font-bold text-center">{user.username}</p>
                                </li>
                            ))}
                            {autocompleteResults.length > 0 && (
                                <li className="flex items-center">
                                    <Typography className={"ml-2 p-2 text-center"} color={"blue"} variant={"h5"}>
                                        <Link
                                            onClick={() => setShowPopover(false)}
                                            to={`/view-all?name=${searchInputValue}`}
                                        >
                                            Xem tất cả
                                        </Link>
                                    </Typography>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="main-box clearfix">
                <div className="table-responsive">
                    <table className="table user-list table table-hover">
                        <thead>
                        {/* ... (existing table header) */}
                        </thead>
                        <tbody>
                        {lockedAccounts.map(account => (
                            <tr
                                key={account.id}
                                className={`account-row ${
                                    selectedUser && selectedUser.id === account.id ? 'selected' : ''
                                }`}
                                onClick={() => setSelectedUser(account)}
                            >
                                <td className="user-show">
                                    <img src={account.img} alt="Avatar" className="img-user" />
                                    {account.username}
                                </td>
                                <td>{account.dob}</td>
                                <td>{account.email}</td>
                                <td>{account.gender === 1 ? 'Nam' : 'Nữ'}</td>
                                <td>{account.age}</td>
                                <td>
                                        <span style={{ color: account.locked ? 'red' : 'green' }}>
                                            {account.locked ? 'Tài khoản đang bị khóa' : 'Tài khoản bình thường'}
                                        </span>
                                </td>
                                <td>
                                    <Switch
                                        checked={account.locked}
                                        onChange={() => handleLockUnlock(account.id, account.locked)}
                                        checkedChildren="Locked"
                                        unCheckedChildren="Normal"
                                        color={account.locked ? 'red' : ''}
                                    />
                                </td>
                            </tr>
                        ))}
                        {selectedUser && (
                            <tr className="account-row selected">
                                <td className="user-show">
                                    <img src={selectedUser.img} alt="Avatar" className="img-user" />
                                    {selectedUser.username}
                                </td>
                                <td>{selectedUser.dob}</td>
                                <td>{selectedUser.email}</td>
                                <td>{selectedUser.gender === 1 ? 'Nam' : 'Nữ'}</td>
                                <td>{selectedUser.age}</td>
                                <td>
                                        <span style={{ color: selectedUser.locked ? 'red' : 'green' }}>
                                            {selectedUser.locked ? 'Tài khoản đang bị khóa' : 'Tài khoản bình thường'}
                                        </span>
                                </td>
                                <td>
                                    <Switch
                                        checked={selectedUser.locked}
                                        onChange={() => handleLockUnlock(selectedUser.id, selectedUser.locked)}
                                        checkedChildren="Locked"
                                        unCheckedChildren="Normal"
                                        color={selectedUser.locked ? 'red' : ''}
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BlockedAccountList;