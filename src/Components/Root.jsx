import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
    return (
        <div className="bg-zinc-800  text-white ">
            <div className="flex justify-center  ">
                <div className="sticky  w-1/4 left-0 bottom-0">
                    <Navbar />
                </div>
                <div className="w-3/4 mx-auto  bottom-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;