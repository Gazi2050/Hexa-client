import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from 'react';
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { googleSignIn, signIn, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const newUser = { email, password };
        console.log(newUser)

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                alert('Please signUp first');
                navigate('/signUp');
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const googleUser = result.user;
                console.log(googleUser);
                const userInfo = {
                    email: googleUser?.email,
                    name: googleUser?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true })
                    })
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }


    return (
        <div>
            <Helmet>
                <title>Hexa | LogIn</title>
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

                        <h3 className="mt-3 text-xl font-medium text-center text-purple-500 dark:text-gray-200">Welcome Back</h3>

                        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login account</p>
                        <div className="flex justify-center items-center my-4">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-purple-500 hover:text-black">
                                <FaGoogle className="w-4 h-4 mr-3" />
                                <span>LogIn with Google</span>
                            </button>
                        </div>
                        <div className="divider text-white divider-secondary my-1">OR</div>
                        <form onSubmit={handleLogIn} >
                            <div className="w-full mt-4">
                                <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type="email" placeholder="Email Address" name="email" />
                            </div>

                            <div className="w-full mt-4 flex justify-center items-center">
                                <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" />
                                <span onClick={() => setShowPassword(!showPassword)} className="text-2xl absolute -mr-[210px] md:-mr-[270px] lg:-mr-[265px] -mb-2 text-purple-500" >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-white transition-all duration-500">Forget Password</a>
                                <button
                                    className="px-6 py-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-purple-500 rounded-lg hover:bg-gray-800 hover:text-purple-400 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                                    type="submit">
                                    {loading ? <span className="loading loading-spinner loading-sm"></span> : 'LogIn'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center justify-center py-4 text-center bg-slate-300 dark:bg-gray-700">
                        <span className="text-sm text-black dark:text-gray-200">Don't have an account? </span>

                        <Link to={'/signUp'} className="mx-2 text-sm font-bold text-purple-500 dark:text-blue-400 hover:underline">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;