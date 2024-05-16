import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiUpvote, BiDownvote, BiSolidCommentDetail, BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { data: Blog = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['blogs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs?email=${user?.email}`);
            return res.data;
        }
    })

    const url = `https://hexa-server.vercel.app/blogs?email=${user?.email}`;

    useEffect(() => {
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [url])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete Blog!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://hexa-server.vercel.app/blogs/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        //console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
                            const remaining = blogs.filter((blog) => blog._id !== id);
                            setBlogs(remaining);
                            navigate('/myBlogs');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                        Swal.fire('Error', 'An error occurred while deleting.', 'error');
                    });
            }
        });
    };

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
                <title>Hexa | My Blogs</title>
            </Helmet>
            <div>
                <h1 className="text-purple-500 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10 -ml-16 lg:-ml-0">My Blogs</h1>
                <p className="text-lg font-bold text-center -ml-16 lg:-ml-0">Blogs : {blogs.length}</p>
            </div>

            <div>
                {(
                    Blog.map(blog => (
                        <div key={blog._id} >
                            {/* for laptop */}
                            <div className="mx-5 my-5 bg-black rounded-2xl shadow-sm shadow-purple-500 hidden lg:block md:hidden">
                                <div className="card card-side bg-zinc-900 pr-60 rounded-b-none">
                                    <figure className="w-[50%]"><img className="w-full h-[340px]" src={blog.img} alt="Movie" /></figure>
                                    <div className="card-body w-[50%]">
                                        <h2 className="card-title text-2xl">{blog.title}</h2>
                                        {blog.dateTime ? (
                                            <p className="text-sm text-slate-600">{blog.dateTime}</p>
                                        ) : (
                                            <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                                        )}
                                        <div className="mt-5">
                                            <p className="mt-2 text-md line-clamp-2 font-semibold">{blog.description}</p>
                                            <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold">See more</Link>
                                        </div>
                                        <div className="flex justify-start space-x-3 mt-3">
                                            <Link to={`/editBlog/${blog._id}`} className="btn btn-sm btn-outline text-purple-500 text-xl"><MdEdit /></Link>
                                            <div onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-outline text-red-600 text-xl"><MdDelete /></div>
                                        </div>
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
                            {/* for tab */}
                            <div className="hidden lg:hidden md:block ml-28 my-5 ">
                                <div className="flex max-w-md overflow-hidden bg-zinc-900 rounded-t-lg  dark:bg-gray-800">
                                    <div className="w-1/3 bg-cover" ><img className="w-full h-full" src={blog.img} alt="" /></div>
                                    <div className="w-2/3 p-4 md:p-4">
                                        <h1 className="text-xl font-bold">{blog.title}</h1>
                                        {blog.dateTime ? (
                                            <p className="text-sm text-slate-600">{blog.dateTime}</p>
                                        ) : (
                                            <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                                        )}
                                        <p className="mt-2 text-sm line-clamp-3 ">{blog.description}</p>
                                        <Link to={`/blogDetails/${blog._id}`} className="text-purple-500 hover:underline font-semibold text-lg">See more</Link>
                                        <br />
                                        <div className="flex justify-start space-x-3 mt-3">
                                            <Link to={`/editBlog/${blog._id}`} className="btn btn-sm btn-outline text-purple-500 text-xl"><MdEdit /></Link>
                                            <div onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-outline text-red-600 text-xl"><MdDelete /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black mr-4 py-2 flex justify-around rounded-b-lg text-2xl">
                                    {blog.upVote?.some(vote => vote?.email === user?.email) ?
                                        (<div className="flex justify-center space-x-2"><p className="text-green-600"><BiSolidUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)
                                        :
                                        (<div className="flex justify-center space-x-2" onClick={() => handleUpVote(blog._id)}><p className="hover:text-green-600"><BiUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)}

                                    {blog.downVote?.some(vote => vote?.email === user?.email) ?
                                        (<div className="flex justify-center space-x-2"><p className="text-red-600"><BiSolidDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)
                                        :
                                        (<div className="flex justify-center space-x-2" onClick={() => handleDownVote(blog._id)}><p className="hover:text-red-600"><BiDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)}
                                </div>
                            </div>

                            {/* for mobile */}
                            <div className="block lg:hidden md:hidden pt-12 -ml-[92px] -mr-1">
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
                                        <div className="flex justify-start space-x-3 mt-3">
                                            <Link to={`/editBlog/${blog._id}`} className="btn btn-sm btn-outline text-purple-500 text-xl"><MdEdit /></Link>
                                            <div onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-outline text-red-600 text-xl"><MdDelete /></div>
                                        </div>
                                    </div>

                                    <img className="object-cover w-full h-48 mt-2" src={blog.img} alt="NIKE AIR" />

                                    <div className="flex items-center justify-around px-4 py-2 bg-gray-900 text-2xl">
                                        {blog.upVote?.some(vote => vote?.email === user?.email) ?
                                            (<div className="flex justify-center space-x-2"><p className="text-green-600"><BiSolidUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)
                                            :
                                            (<div className="flex justify-center space-x-2" onClick={() => handleUpVote(blog._id)}><p className="hover:text-green-600"><BiUpvote /></p><span>{blog.upVote?.length > 0 ? blog.upVote.length : '0'}</span></div>)}

                                        {blog.downVote?.some(vote => vote?.email === user?.email) ?
                                            (<div className="flex justify-center space-x-2"><p className="text-red-600"><BiSolidDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)
                                            :
                                            (<div className="flex justify-center space-x-2" onClick={() => handleDownVote(blog._id)}><p className="hover:text-red-600"><BiDownvote /></p><span>{blog.downVote && blog.downVote.length > 0 ? blog.downVote.length : '0'}</span></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBlogs;