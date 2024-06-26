import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        //console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const newUser = result.user;

                console.log(newUser);
                updateUserProfile(data.name)
                    .then(() => {
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    navigate('/');

                                }

                            })
                    })
                    .catch(error => {
                        console.log(error)
                    }
                    )
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage);
            });
    }
    return (
        <div>
            <Helmet>
                <title>Hexa | SignUp</title>
            </Helmet>
            <div className="pt-0 md:pt-14 lg:pt-14 bg-zinc-800
        h-screen">
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-black rounded-lg shadow-md dark:bg-gray-800">
                    <div className="px-6 py-4">
                        <div className="flex justify-center mx-auto">
                            <Link to={'/'}>
                                <img className="w-auto h-14" src="assets/logo.png" alt="" />
                            </Link>
                        </div>

                        <h3 className="mt-3 text-xl font-medium text-center text-purple-500 dark:text-gray-200">Welcome</h3>

                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">create account</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full mt-4">
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500"
                                    type="text"
                                    name="name"
                                    placeholder="user name"
                                    {...register("name", { required: true })}
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500"
                                    type="email"
                                    name="email"
                                    placeholder="email address"
                                    {...register("email", { required: true })}
                                />
                            </div>

                            <div className="w-full mt-2 flex justify-center items-center">
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="password"
                                    {...register('password', {
                                        required: true,
                                        minLength: 7,
                                        validate: {
                                            uppercase: (value) => /[A-Z]/.test(value),
                                            lowercase: (value) => /[a-z]/.test(value),
                                            digit: (value) => /\d/.test(value),
                                            specialChar: (value) => /[@$!%*?&]/.test(value),
                                        },
                                    })}
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="text-2xl absolute -mr-[210px] md:-mr-[270px] lg:-mr-[265px] -mb-2 text-purple-500" >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    className="px-6 py-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-purple-500 rounded-lg hover:bg-gray-800 hover:text-purple-500 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                                    type="submit">
                                    {loading ? <span className="loading loading-spinner loading-sm"></span> : 'SignUp'}
                                </button>
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-600 font-medium">Password is required</p>}
                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-600 font-medium">Password must be at least 7 characters</p>
                            )}
                            {errors.password?.type === 'uppercase' && (
                                <p className="text-red-600 font-medium">Password must include at least one uppercase letter</p>
                            )}
                            {errors.password?.type === 'lowercase' && (
                                <p className="text-red-600 font-medium">Password must include at least one lowercase letter</p>
                            )}
                            {errors.password?.type === 'digit' && (
                                <p className="text-red-600 font-medium">Password must include at least one digit</p>
                            )}
                            {errors.password?.type === 'specialChar' && (
                                <p className="text-red-600 font-medium">Password must include at least one special character (@$!%*?&)</p>
                            )}
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-slate-300 dark:bg-gray-700">
                        <span className="text-sm text-black dark:text-gray-200">Already have an account? </span>

                        <Link to={'/logIn'} className="mx-2 text-sm font-bold text-purple-500 dark:text-blue-400 hover:underline">LogIn</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;