import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CreateBlog = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);

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