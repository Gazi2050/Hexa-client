import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
    return (
        <div className="bg-zinc-800 h-screen text-white ">
            <div className="flex justify-start">
                <div>
                    <Navbar />
                </div>
                <div className="pt-10 -ml-14 lg:-ml-0 md:-ml-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;