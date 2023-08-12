import {BrowserRouter, Route, Routes} from "react-router-dom";
import Content from "./components/content/Content";
import TransferForm from "./components/login/TransferForm";
import {ComplexNavbar} from "./components/navbar/Navbar";
import PartnerInfo from "./components/user-info/PartnerInfo";
import RegisterUser from "./components/login/RegisterUser";
import RegisterCCDV from "./components/login/RegisterCCDV";
import Login from "./components/login/Login";
import UserInfo from "./components/user-info/UserInfo";
import SearchLogin from "./components/search/SearchLogin";
import SearchFilter from "./components/search/SearchFilter";
import EditPartnerInfo from "./components/user-info/EditPartnerInfo";
import HomePageRenter from "./components/top3BookingUser/home/HomePageRenter";
import HomePageRecent from "./components/top3BookingUser/home/HomePageRecent";
import DetailRent from "./components/list/DetailRent";
import SidebarTop3 from "./components/top3BookingUser/SidebarTop3";
import MenuBar from "./components/user-info/MenuBar";
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
                    <Route path={"/search"} element={<SearchLogin/>}></Route>
                    <Route path={"/search_filter"} element={<SearchFilter/>}></Route>
                    <Route path={"/edit-info"} element={<EditPartnerInfo/>}></Route>
                    <Route path={"/home-renters"} element={<HomePageRenter/>}></Route>
                    <Route path={"/home-recent"} element={<HomePageRecent/>}></Route>
                    <Route path={"/detail-rent/:id"} element={<DetailRent/>}></Route>
                    <Route path={"/view-transaction/:id"} element={<MenuBar/>}></Route>
                    <Route path={"/sidebar"} element={<SidebarTop3/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}