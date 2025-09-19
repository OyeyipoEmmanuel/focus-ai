import type { ReactElement } from "react";
import Login from "../features/auth/pages/Login"
import SignUp from "../features/auth/pages/SignUp";
import Home from "../features/dashboard/Home";

type ROUTES =
    {
        path: string;
        element: ReactElement
    }


const routes: ROUTES[] = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/home',
        element: <Home />
    },
]

export default routes
