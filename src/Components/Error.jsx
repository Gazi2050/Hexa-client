import { PiPlanetDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="bg-zinc-800 h-screen">
            <div className="pt-16">
                <div className="text-9xl font-bold text-purple-500 text-center ">
                    <h1 className="font-mono ">404</h1>
                    <div className="flex justify-center items-center">
                        <PiPlanetDuotone />
                    </div>
                    <p className="text-2xl font-mono">Page Not Found</p>
                </div>
                <div className="flex justify-center items-center space-x-3 mt-5">
                    <Link to={'/'} className="btn btn-outline text-purple-500 btn-md md:btn-md lg:btn-md hover:bg-black">Home</Link>
                    <Link to={-1} className="btn btn-outline text-purple-500 btn-md md:btn-md lg:btn-md hover:bg-black">Go Back</Link>
                </div>
            </div>
        </div>
    );
};

export default Error;