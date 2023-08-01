import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithLogo} from "./components/footer/Footer";
import Content from "./components/content/Content";
import UserInfo from "./components/user-info/UserInfo";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Content/>}></Route>
                    <Route path={"/user/:id"} element={<UserInfo/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterWithLogo/>
        </>
    );
}
