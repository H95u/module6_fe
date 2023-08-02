import React from "react";
import ReactDOM from "react-dom/client";
// // import "./index.css"
// import "./components/login/AccessAcount.css"
import {ThemeProvider} from "@material-tailwind/react";
import TranstForm from "./components/login/TranstForm";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <TranstForm/>
        </ThemeProvider>
    </React.StrictMode>,
);
