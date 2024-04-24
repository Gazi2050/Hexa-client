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

    const url = `http://localhost:5000/blogs?email=${user?.email}`;

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
                fetch(`http://localhost:5000/blogs/${id}`, {
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
                <h1 className="text-purple-500 text-xl lg:text-4xl md:text-3xl text-center font-bold p-10">My Blogs</h1>
                <p className="text-lg font-bold text-center">Blogs : {blogs.length}</p>
            </div>
            <div>
                {(
                    Blog.map(blog => (
                        <div key={blog._id} className="mx-5 my-5 bg-black rounded-2xl shadow-sm shadow-purple-500">
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
                                        <p className="truncate font-semibold">{blog.description}</p>
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
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBlogs;