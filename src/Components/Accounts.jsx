
const Accounts = () => {
    return (
        <div className="flex justify-center items-center px-52 ">
            <div>
                <div className="w-full max-w-md p-20 mt-16 bg-zinc-800 rounded-lg shadow-lg dark:bg-gray-800 shadow-purple-500">
                    <div className="flex justify-center -mt-32">
                        <img className="object-cover w-24 h-24 border-2 border-purple-500 rounded-full dark:border-blue-400 bg-white" alt="Testimonial avatar" src="assets/profile-user.png" />
                    </div>

                    <div className="space-y-5 -ml-11 mt-3">
                        <h2 className="mt-2 text-xl font-semibold text-white dark:text-white md:mt-0">username :</h2>
                        <h2 className="mt-2 text-xl font-semibold text-white dark:text-white md:mt-0">email :</h2>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;