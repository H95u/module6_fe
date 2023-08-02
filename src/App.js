import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithLogo} from "./components/footer/Footer";
import Content from "./components/content/Content";
import TranstForm from "./components/login/TranstForm";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/*<Route path={"/"} element={<Content/>}></Route>*/}
                    <Route path={"/"} element={<TranstForm/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterWithLogo/>
        </>
    );
}
