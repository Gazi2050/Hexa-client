import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
const logIn = () => {
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
                            <button type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-purple-500 hover:text-black">
                                <FaGoogle className="w-4 h-4 mr-3" />
                                <span>LogIn with Google</span>
                            </button>
                        </div>
                        <div className="divider text-white divider-secondary my-1">OR</div>
                        <form>
                            <div className="w-full mt-4">
                                <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type="email" placeholder="Email Address" aria-label="Email Address" />
                            </div>

                            <div className="w-full mt-4 flex justify-center items-center">
                                <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type="password" placeholder="Password" aria-label="Password" />
                                <FaEye className="text-2xl absolute -mr-[210px] md:-mr-[270px] lg:-mr-[265px] -mb-2 text-purple-500" />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-white transition-all duration-500">Forget Password</a>


                                <button className="px-6 py-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-purple-500 rounded-lg hover:bg-gray-800 hover:text-purple-400 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50">
                                    LogIn
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

export default logIn;