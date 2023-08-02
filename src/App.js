import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithSocialLinks} from "./components/footer/Footer";
import Content from "./components/content/Content";
import UserInfo from "./components/user-info/UserInfo";
import Navbar from "./components/navbar/Navbar";


export default function App() {
    return (
        <>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Content/>}></Route>
                    <Route path={"/user/:id"} element={<UserInfo/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterWithSocialLinks/>
        </>
    );
}