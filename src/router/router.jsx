import { createBrowserRouter } from "react-router";
import RootLayout from "../layaout/RootLayout";
import Home from "../page/Home/Home";
import Login from "../Component/Auth/Login/Login";
import Register from "../Component/Auth/Register/Register";

export const router=createBrowserRouter([
    {
        path:"/",
        Component: RootLayout ,
    children:[
        {
            index:true,
            Component: Home
        },
        {
            path:"/login",
            Component: Login
        },
        {
            path:"/register",
            Component:Register
        }
        
    ]
       
    }
])