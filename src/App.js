import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import RegisterUser from "./components/login/RegisterUser";
import RegisterCCDV from "./components/login/RegisterCCDV";



export default function App() {
    return (
        <>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/registerUser"} element={<RegisterUser/>}></Route>
                    <Route path={"/registerCCDV"} element={<RegisterCCDV/>}></Route>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterWithSocialLinks/>
        </>
    );
}
