import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { BiUpvote, BiDownvote, BiSolidCommentDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: blogs = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        }
    })

    const handleDeleteEvent = async (event) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/allBlogs/${event}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog has been deleted.",
                        icon: "success",
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting blog", error);
            alert("Error deleting blog")
        }
    };


    return (
        <div>
            <Helmet>
                <title>Hexa | Dashboard</title>
            </Helmet>
            {isLoading && (
                <div className="flex justify-center items-center mt-44">
                    <p className="text-2xl font-bold text-purple-500 text-center">Loading...</p>
                </div>
            )}
            {isError && (
                <div className="flex justify-center items-center mt-44">
                    <p className="text-2xl font-bold text-red-600 text-center">Error fetching blogs</p>
                </div>
            )}
            {blogs.map(blog => <div key={blog._id} className="m-5 bg-black rounded-2xl shadow-sm  shadow-purple-500">
                <div className="card card-side bg-zinc-900 pr-60 rounded-b-none">
                    <figure className="w-[50%]"><img className="w-full h-[340px]" src={blog.img} alt="Movie" /></figure>
                    <div className="card-body w-[50%]">
                        <h2 className="card-title text-2xl">{blog.title}</h2>
                        {blog.dateTime ? (
                            <p className="text-sm text-slate-600">{blog.dateTime}</p>
                        ) : (
                            <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                        )}
                        <div className="mb-10 ">
                            <p className="truncate font-bold ">{blog.description}</p>
                            <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold ">See more</Link>
                        </div>
                        <div className="flex justify-start mt-12">
                            <div onClick={() => handleDeleteEvent(blog._id)} className="btn btn-sm btn-outline text-red-600 text-xl -my-14"><MdDelete /></div>
                        </div>
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

export default Home;