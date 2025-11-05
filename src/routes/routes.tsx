import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/SignUp";
import Page from "../features/dashboard/page";
import Home from "../features/dashboard/Home/pages/Home";
import Task from "../features/dashboard/Tasks/pages/Task";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import Schedule from "../features/dashboard/Schedule/page";


export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Page />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "tasks",
            element: <Task />,
          },
          {
            path: "schedule",
            element: <Schedule />,
          },
        ],
      }
    ],
  },
];


