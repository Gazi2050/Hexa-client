import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiUpvote, BiDownvote, BiSolidCommentDetail } from "react-icons/bi";
import { AuthContext } from "../Providers/AuthProvider";

const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);

    const url = `http://localhost:5000/blogs?email=${user?.email}`;


    return (
        <div>
            <Helmet>
                <title>Hexa | My Blogs</title>
            </Helmet>
            <div><h1>my blogs</h1></div>
        </div>
    );
};

export default MyBlogs;