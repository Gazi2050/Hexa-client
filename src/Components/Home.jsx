import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote, BiSolidCommentDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Home = () => {
    const [isAdmin] = useAdmin();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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


    // Update handleVote function to handle both upvote and downvote
    const handleUpVote = async (blogId) => {
        try {
            const email = user.email;
            const UpdateBlog = {
                email
            };
            const response = await axiosSecure.put(`/upVote/${blogId}`, UpdateBlog);
            const data = await response.data;

            console.log(data);
            if (data.modifiedCount) {
                refetch()
            } else {
                alert('Failed to upVote');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Please logIn');
            navigate('/logIn');
        }
    };
    const handleDownVote = async (blogId) => {
        try {
            const email = user.email;
            const UpdateBlog = {
                email
            };
            const response = await axiosSecure.put(`/downVote/${blogId}`, UpdateBlog);
            const data = await response.data;

            console.log(data);
            if (data.modifiedCount) {
                refetch()
            } else {
                alert('Failed to upVote');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Please logIn');
            navigate('/logIn');
        }
    };



    //comment system
    // const handleComment = async (blogId) => {
    //     // Implement logic to handle commenting
    // };


    return (
        <div>
            <Helmet>
                <title>Hexa | Dashboard</title>
            </Helmet>
            {isLoading && (
                <div className="flex justify-center items-center p-60">
                    <span className="loading loading-spinner loading-lg bg-purple-500"></span>
                </div>
            )}
            {isError && (
                <div className="flex justify-center items-center p-60">
                    <p className="text-2xl font-bold text-red-600 text-center">Error fetching blogs</p>
                </div>
            )}
            {blogs.map(blog => <div key={blog._id} >
                {/* for laptop */}
                <div className="hidden lg:block m-5 bg-black rounded-2xl shadow-sm  shadow-purple-500">
                    <div className="card card-side bg-zinc-900 pr-60 rounded-b-none">
                        <figure className="w-[50%]"><img className="w-full h-[340px]" src={blog.img} alt="Movie" /></figure>
                        <div className="card-body w-[50%]">
                            <h2 className="card-title text-2xl">{blog.title}</h2>
                            {blog.dateTime ? (
                                <p className="text-sm text-slate-600">{blog.dateTime}</p>
                            ) : (
                                <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                            )}
                            {user ? (
                                isAdmin ? (
                                    <div>
                                        <div className="mb-24">
                                            <p className="truncate font-bold">{blog.description}</p>
                                            <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold">See more</Link>
                                        </div>
                                        <div className="flex justify-start mt-12">
                                            <div onClick={() => handleDeleteEvent(blog._id)} className="btn btn-sm btn-outline text-red-600 text-xl -my-14"><MdDelete /></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-20">
                                        <p className="truncate font-bold">{blog.description}</p>
                                        <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold">See more</Link>
                                    </div>
                                )
                            ) : (null)}


                        </div>
                    </div>
                    <div className="flex justify-evenly py-2 text-2xl">

                        {blog.upVote?.some(vote => vote?.email === user?.email) ?
                            (<div className="flex justify-center space-x-2"><p className="text-green-600"><BiSolidUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)
                            :
                            (<div className="flex justify-center space-x-2" onClick={() => handleUpVote(blog._id)}><p className="hover:text-green-600"><BiUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)}

                        {blog.downVote?.some(vote => vote?.email === user?.email) ?
                            (<div className="flex justify-center space-x-2"><p className="text-red-600"><BiSolidDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)
                            :
                            (<div className="flex justify-center space-x-2" onClick={() => handleDownVote(blog._id)}><p className="hover:text-red-600"><BiDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)}

                        {//comment system
                            /* <div className="flex justify-center space-x-2"><p className="hover:text-purple-600"><BiSolidCommentDetail /></p><span>5</span></div> */
                        }
                    </div>
                </div>
                {/* for mobile */}
                <div className="block lg:hidden md:hidden -ml-20 pt-20 ">
                    <div className="w-full overflow-hidden bg-zinc-900 rounded-lg shadow-lg dark:bg-gray-800 -mt-8">
                        <div className="px-4 py-2">
                            <h1 className="text-xl font-bold text-white uppercase dark:text-white">{blog.title}</h1>
                            {blog.dateTime ? (
                                <p className="text-sm text-slate-600">{blog.dateTime}</p>
                            ) : (
                                <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                            )}
                            <div className="mt-5">
                                <p className="truncate font-bold">{blog.description}</p>
                                <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold text-xl">See more</Link>
                            </div>
                        </div>

                        <img className="object-cover w-full h-48 mt-2" src={blog.img} alt="NIKE AIR" />

                        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                            <h1 className="text-lg font-bold text-white">$129</h1>

                        </div>
                    </div>
                </div>
            </div>)
            }
        </div >
    );
};

export default Home;