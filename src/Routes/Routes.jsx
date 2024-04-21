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
import AllUsers from "../Components/AllUsers";
import Error from "../Components/Error";
import EditBlog from "../Components/EditBlog";
import BlogDetails from "../Components/BlogDetails";
import PrivateRoute from "./PrivateRoute";
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
                element: <PrivateRoute><Accounts /></PrivateRoute>
            },
            {
                path: '/myBlogs',
                element: <PrivateRoute><MyBlogs /></PrivateRoute>
            },
            {
                path: '/blogDetails/:id',
                element: <PrivateRoute><BlogDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`)
            },
            {
                path: '/createBlog',
                element: <PrivateRoute><CreateBlog /></PrivateRoute>
            },
            {
                path: '/editBlog/:id',
                element: <PrivateRoute><EditBlog /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
            },
            {
                path: '/allUsers',
                element: <PrivateRoute><AllUsers /></PrivateRoute>
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