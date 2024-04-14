import { Helmet } from "react-helmet-async";

const CreateBlog = () => {
    return (
        <div>
            <Helmet>
                <title>Hexa | Create Blog</title>
            </Helmet>
            <h1 className="font-medium text-lg  p-5">Create blog</h1>
        </div>
    );
};

export default CreateBlog;