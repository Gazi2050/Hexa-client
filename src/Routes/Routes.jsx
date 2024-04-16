import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Components/Home";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/SignUp";
import Accounts from "../Components/Accounts";
import MyBlogs from "../Components/MyBlogs";
import CreateBlog from "../Components/CreateBlog";
import AllBlogs from "../Components/AllBlogs";
import AllUsers from "../Components/AllUsers";
import Error from "../Components/Error";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
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
                element: <MyBlogs />
            },
            {
                path: '/createBlog',
                element: <CreateBlog />
            },
            {
                path: '/allBlogs',
                element: <AllBlogs />
            },
            {
                path: '/allUsers',
                element: <AllUsers />
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