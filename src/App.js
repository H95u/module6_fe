import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithSocialLinks} from "./components/footer/Footer";
import Content from "./components/content/Content";

import TransferForm from "./components/login/TransferForm";

import {ComplexNavbar} from "./components/navbar/Navbar";
import PartnerInfo from "./components/user-info/PartnerInfo";
import RegisterUser from "./components/login/RegisterUser";
import RegisterCCDV from "./components/login/RegisterCCDV";
import Login from "./components/login/Login";
import UserInfo from "./components/user-info/UserInfo";



export default function App() {
    return (
        <>
            <BrowserRouter>
                <ComplexNavbar/>
                <Routes>
                    <Route path={"/"} element={<Content/>}></Route>
                    <Route path={"/register-user"} element={<RegisterUser/>}></Route>
                    <Route path={"/register-partner"} element={<RegisterCCDV/>}></Route>
                    <Route path={"/signup"} element={<TransferForm/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path={"/user/:id"} element={<PartnerInfo/>}></Route>
                    <Route path={"/user-info"} element={<UserInfo/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}