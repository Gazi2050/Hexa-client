import { Helmet } from "react-helmet-async";


const MyBlogs = () => {
    return (
        <div>
            <Helmet>
                <title>Hexa | My Blogs</title>
            </Helmet>
            <h1 className="font-medium text-lg  p-5">My blogs</h1>
        </div>
    );
};

export default MyBlogs;