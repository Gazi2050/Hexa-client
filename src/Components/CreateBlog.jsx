import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
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

    // const onSubmit = async (data) => {
    //     moment().format('MMMM Do YYYY, h:mm:ss a');
    //     console.log(data);
    //     const imageFile = { image: data.img[0] }
    //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     });
    //     if (res.data.success) {
    //         // now send the menu item data to the server with the image url
    //         const blog = {
    //             title: data.title,
    //             description: data.description,
    //             eventFee: parseInt(data.eventFee),
    //             dateTime: dateTime,
    //             img: res.data.data.display_url
    //         }
    //         const eventRes = await axiosSecure.post('/events', eventItem);
    //         //console.log(eventRes.data)
    //         if (eventRes.data.insertedId) {
    //             reset();
    //             alert('Event added successfully');
    //             navigate('/events');
    //         } else {
    //             alert('Failed to add event. Please try again.');
    //         }
    //     }
    //     console.log(res.data);
    // }

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
                dateTime: dateTime // Include the dateTime in the blog data
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
            {user ?
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
                :
                <div className="flex justify-center items-center pt-24 lg:ml-48 -mt-10">
                    <div className="w-full px-20 py-14 lg:px-28 lg:py-16 lg:mt-5 mb-5 bg-zinc-800 rounded-lg shadow-lg dark:bg-gray-800  shadow-purple-500 text-white">

                        <h1>Please LogIn or SignUp</h1>
                        <div className="flex justify-center items-center space-x-3 mt-5">
                            <Link to={'/logIn'} className="btn btn-outline text-purple-500 btn-md md:btn-md lg:btn-md hover:bg-black">LogIn</Link>
                            <Link to={'/signUp'} className="btn btn-outline text-purple-500 btn-md md:btn-md lg:btn-md hover:bg-black">SignUp</Link>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default CreateBlog;