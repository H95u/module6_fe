import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithLogo} from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import RegisterUser from "./components/login/RegisterUser";
import RegisterCCDV from "./components/login/RegisterCCDV";



export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/registerUser"} element={<RegisterUser/>}></Route>
                    <Route path={"/registerCCDV"} element={<RegisterCCDV/>}></Route>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
