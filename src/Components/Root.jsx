import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
    return (
        <div>
            <div className="flex justify-start">
                <div>
                    <Navbar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;