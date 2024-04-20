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
                path: '/editBlog/:id',
                element: <EditBlog />,
                loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                })
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