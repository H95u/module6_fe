import React from "react";
import ReactDOM from "react-dom/client";

import {ThemeProvider} from "@material-tailwind/react";

import "./index.css";
import "./home.css";
import App from "./App";
import ViewRent from "./components/list/ViewRent";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
            {/*<ViewRent/>*/}
        </ThemeProvider>
    </React.StrictMode>,
);