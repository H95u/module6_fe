import React from "react";
import ReactDOM from "react-dom/client";

import {ThemeProvider} from "@material-tailwind/react";

import "./index.css";
import "./home.css";
import App from "./App";
import UserManagement from "./components/admin/UserManagement";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <ThemeProvider>
            <App/>
            {/*<UserManagement/>*/}
        </ThemeProvider>
);