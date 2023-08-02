import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithSocialLinks} from "./components/footer/Footer";
import Content from "./components/content/Content";

import TranstForm from "./components/login/TranstForm";

import UserInfo from "./components/user-info/UserInfo";
import Navbar from "./components/navbar/Navbar";
import PartnerInfo from "./components/user-info/PartnerInfo";



export default function App() {
    return (
        <>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    {/*<Route path={"/"} element={<Content/>}></Route>*/}
                    <Route path={"/"} element={<TranstForm/>}></Route>

                    <Route path={"/"} element={<Content/>}></Route>
                    <Route path={"/user/:id"} element={<PartnerInfo/>}></Route>

                </Routes>
            </BrowserRouter>
            <FooterWithSocialLinks/>
        </>
    );
}