import Login from "../features/auth/pages/Login"
import SignUp from "../features/auth/pages/SignUp";
import Page from "../features/dashboard/page";
import Home from "../features/dashboard/Home/pages/Home";
import type { RouteObject } from "react-router-dom";


const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />
    },
    // {
    //     path: '/',
    //     element: <Login />
    // },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/',
        element: <Page />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'home',
                element: <Home />
            }
        ]
    },
]

export default routes
