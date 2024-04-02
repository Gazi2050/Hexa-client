import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/Root";
import Home from "../Components/Home";
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
                element: <p>accounts</p>
            },
            {
                path: '/myBlogs',
                element: <p>blogs</p>
            },
            {
                path: '/createBlog',
                element: <p>Create Blog</p>
            },
        ]
    },
]);