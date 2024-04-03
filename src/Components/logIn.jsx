

const logIn = () => {
    return (
        <div className="pt-20 bg-zinc-800
        h-screen">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-black rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-14" src="src/assets/logo.png" alt="" />
                    </div>

                    <h3 className="mt-3 text-xl font-medium text-center text-purple-500 dark:text-gray-200">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

                    <form>
                        <div className="w-full mt-4">
                            <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type="email" placeholder="Email Address" aria-label="Email Address" />
                        </div>

                        <div className="w-full mt-4">
                            <input className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-500 bg-slate-900 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-blue-300 focus:ring-opacity-100 focus:outline-none focus:ring focus:ring-purple-500" type="password" placeholder="Password" aria-label="Password" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-white transition-all duration-500">Forget Password?</a>


                            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-slate-300 dark:bg-gray-700">
                    <span className="text-sm text-black dark:text-gray-200">Don't have an account? </span>

                    <a href="#" className="mx-2 text-sm font-bold text-purple-500 dark:text-blue-400 hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default logIn;