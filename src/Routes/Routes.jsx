import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Components/Home";
import LogIn from "../Components/logIn";
import SignUp from "../Components/SignUp";
import Accounts from "../Components/Accounts";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1 className="text-5xl font-bold">Error</h1>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/accounts',
                element: <Accounts />
            },
            {
                path: '/myBlogs',
                element: <p>blogs</p>
            },
            {
                path: '/createBlog',
                element: <p>Create Blog</p>
            },
            {
                path: '/allBlogs',
                element: <p>allBlogs</p>
            },
            {
                path: '/allUsers',
                element: <p>allUsers</p>
            },
        ]
    },
    {
        path: "/logIn",
        element: <LogIn />,
    },
    {
        path: "/signUp",
        element: <SignUp />,
    },
]);