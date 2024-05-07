import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Providers/AuthProvider";

const Accounts = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="lg:max-w-lg lg:mx-40">
            <Helmet>
                <title>Hexa | Accounts</title>
            </Helmet>
            <div className="-ml-16 mr-5 md:ml-28 lg:ml-0">
                <div className="w-full max-w-md px-8 py-4  my-40 bg-zinc-800 rounded-lg shadow-lg shadow-purple-500">
                    <div className="flex justify-center -mt-16 md:justify-center">
                        <img className="object-cover w-28 h-28 border-2 border-purple-500 rounded-full bg-white" alt="Testimonial avatar" src="public/assets/profile-user.png" />
                    </div>
                    <div className="space-y-4 py-10">
                        <h2 className="mt-2 text-xl font-semibold text-white md:mt-0">Name : <span>{user.displayName}</span></h2>
                        <h2 className="mt-2 text-xl font-semibold text-white md:mt-0">Email : <span>{user.email}</span></h2>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Accounts;