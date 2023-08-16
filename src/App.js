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
import EditPartnerInfo from "./components/user-info/EditPartnerInfo";
import DetailRent from "./components/list/DetailRent";
import SidebarTop3 from "./components/top3BookingUser/SidebarTop3";
import MenuBar from "./components/user-info/MenuBar";
import DetailUserRent from "./components/list/DetailUserRent";
import SendMessageModal from "./components/messageForUser/SendMessageModal";
import Album from "./components/album/Album";
import RevenueChart from "./components/chart/RevenueChart";

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
                    <Route path={"/edit-info"} element={<EditPartnerInfo/>}></Route>
                    <Route path={"/detail-rent/:id"} element={<DetailRent/>}></Route>
                    <Route path={"/detail-user-rent/:id"} element={<DetailUserRent/>}></Route>
                    <Route path={"/view-transaction/:id"} element={<MenuBar/>}></Route>
                    <Route path={"/sidebar"} element={<SidebarTop3/>}></Route>
                    <Route path={"/message"} element={<SendMessageModal/>}></Route>
                    <Route path={"/view-all"} element={<SearchLogin/>}></Route>
                    <Route path={"/album/:id"} element={<Album/>}></Route>
                    <Route path={"/revenue/:id"} element={<RevenueChart/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}