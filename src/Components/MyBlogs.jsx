import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiUpvote, BiDownvote, BiSolidCommentDetail } from "react-icons/bi";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

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
                    blogs.map(blog => (
                        <div key={blog._id} className="mx-5 my-5 bg-black rounded-2xl shadow-sm shadow-purple-500">
                            <div className="card card-side bg-zinc-900 pr-60 rounded-b-none">
                                <figure className="w-[50%]"><img className="w-full h-72" src={blog.img} alt="Movie" /></figure>
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
                                <div className="flex justify-center space-x-2"><p className="text-green-600"><BiUpvote /></p><span>0</span></div>
                                <div className="flex justify-center space-x-2"><p className="text-red-600"><BiDownvote /></p><span>5</span></div>
                                <div className="flex justify-center space-x-2"><p className="text-purple-600"><BiSolidCommentDetail /></p><span>5</span></div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBlogs;