import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EditBlog = () => {
    const event = useLoaderData();
    const [inputValue, setInputValue] = useState();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });


    const blogToEdit = blogs[0] || {};
    const { _id, title, description } = blogToEdit;

    const handleUpdateBlog = async (e) => {
        event.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;


        try {
            const UpdateBlog = {
                title,
                description
            };

            const response = await axiosSecure.put(`/blogs/${_id}`, UpdateBlog);
            const data = await response.data;

            console.log(data);
            if (data.modifiedCount) {
                alert('Blog Updated successfully');
                navigate('/myBlogs');
            } else {
                alert('Failed to update blog');
            }
        } catch (error) {
            const errorCode = error.code;
            console.error('Error updating blog:', errorCode);
        }
    };

    return (
        <div>
            <div className="mt-11 ">
                <form onSubmit={''}
                    className="bg-zinc-800 shadow-md shadow-purple-500 px-9 py-1 -mt-5 lg:px-20 lg:py-2  rounded-md space-y-5 lg:-mt-10 " >
                    <div className="space-y-5">
                        <p className="text-center font-semibold text-xl lg:text-4xl mt-2">Create Blog</p>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-md border-2 focus:border-purple-500 w-full  bg-black " />
                        <textarea
                            type="text"
                            placeholder="Description"
                            className="input input-md border-2 focus:border-purple-500 w-full  bg-black pb-40 pt-3" />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-outline btn-md md:btn-md -mt-5 mb-2 text-purple-500 hover:bg-black">
                            Post
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditBlog;
