import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import moment from "moment";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateBlog = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // Get the current date and time
        const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');

        console.log(data);
        const imageFile = { image: data.img[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // Now send the blog data to the server with the image URL and date/time
            const blog = {
                title: data.title,
                description: data.description,
                img: res.data.data.display_url,
                dateTime: dateTime,
                email: user.email,
                name: user.displayName,
            }

            const blogRes = await axiosSecure.post('/blogs', blog); // Assuming '/blogs' is the endpoint for creating blog posts
            if (blogRes.data.insertedId) {
                reset();
                alert('Blog added successfully');
                navigate('/');
            } else {
                alert('Failed to add blog . Please try again.');
            }
        }
        console.log(res.data);
    }

    return (
        <div className="mt-10 lg:pt-5 mr-10 md:ml-36  lg:ml-36">
            <Helmet>
                <title>Hexa | Create Blog</title>
            </Helmet>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="bg-zinc-800 shadow-md shadow-purple-500 px-9 py-1 -mt-5 lg:px-20 lg:py-2  rounded-md space-y-5 lg:-mt-10 " >
                    <div className="space-y-5">
                        <p className="text-center font-semibold text-xl lg:text-4xl mt-2">Create Blog</p>
                        <input
                            {...register('title', { required: true })}
                            type="text"
                            placeholder="Title"
                            className="input input-md border-2 focus:border-purple-500 w-full  bg-black " />
                        <textarea
                            {...register('description', { required: true })}
                            type="text"
                            placeholder="Description"
                            className="input input-md border-2 focus:border-purple-500 w-full  bg-black pb-40 pt-3" />
                    </div>

                    <input
                        {...register('img')}
                        type="file"
                        className="file-input-sm lg:file-input-md file-input file-input-bordered  max-w-xs bg-black w-full" />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-outline btn-md md:btn-md -mt-5 mb-2 text-purple-500 hover:bg-black">
                            Post
                        </button>
                    </div>
                    {errors.title?.type === 'required' && <p className="text-red-600 font-medium">Title is required</p>}
                    {errors.description?.type === 'required' && <p className="text-red-600 font-medium">Description is required</p>}
                </form>

            </div>
        </div>
    );
};

export default CreateBlog;