import { Helmet } from "react-helmet-async";


const AllBlogs = () => {
    return (
        <div>
            <Helmet>
                <title>Hexa | All Blogs</title>
            </Helmet>
            <h1 className="font-medium text-lg  p-5">All blogs</h1>
        </div>
    );
};

export default AllBlogs;