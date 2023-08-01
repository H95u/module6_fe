import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FooterWithLogo} from "./components/footer/Footer";
import Content from "./components/content/Content";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Content/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterWithLogo/>
        </>
    );
}
