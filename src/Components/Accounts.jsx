import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Accounts = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="lg:pt-5 mr-10 md:ml-36  lg:ml-80">
            <Helmet>
                <title>Hexa | Accounts</title>
            </Helmet>
            {user ?
                <div className="flex justify-center items-center pt-24">
                    <div className="w-full px-20 py-14 lg:px-28 lg:py-16 lg:mt-5 mb-5 bg-zinc-800 rounded-lg shadow-lg dark:bg-gray-800  shadow-purple-500 text-white">
                        <div className="flex justify-center -mt-28 md:justify-center mb-10">
                            <img className="object-cover w-auto h-auto md:w-28 lg:w-32 lg:h-32 border-[3px] border-purple-500 rounded-full dark:border-blue-400 bg-white" alt="Testimonial avatar" src='public/assets/profile-user.png' />
                        </div>
                        <div className="space-y-5 -ml-10 text-lg font-semibold">
                            <h2 className="m-2  md:mt-0"><span className="font-bold">Name :</span> {user.displayName} </h2>
                            <h2 className="m-2 md:mt-0"><span className="font-bold">Email :</span> {user.email}</h2>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center pt-24">
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

export default Accounts;