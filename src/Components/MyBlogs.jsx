import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiUpvote, BiDownvote, BiSolidCommentDetail } from "react-icons/bi";

const MyBlogs = () => {
    const axiosSecure = useAxiosSecure()
    const { data: blogs = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>Hexa | My Blogs</title>
            </Helmet>
            {blogs.map(blog => <div key={blog._id} className="mx-5 mb-5 bg-black rounded-2xl shadow-sm  shadow-purple-500">
                <div className="card card-side bg-zinc-800 pr-60">
                    <figure className="w-[50%]"><img className="w-full h-72" src={blog.img} alt="Movie" /></figure>
                    <div className="card-body w-[50%]">
                        <h2 className="card-title text-2xl">{blog.title}</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                    </div>
                </div>
                <div className="flex justify-evenly py-2 text-2xl">
                    <div className="flex justify-center space-x-2"><p className="hover:text-green-600"><BiUpvote /></p><span>5</span></div>
                    <div className="flex justify-center space-x-2"><p className="hover:text-red-600"><BiDownvote /></p><span>5</span></div>
                    <div className="flex justify-center space-x-2"><p className="hover:text-purple-600"><BiSolidCommentDetail /></p><span>5</span></div>
                </div>
            </div>)

            }
        </div>
    );
};

export default MyBlogs;