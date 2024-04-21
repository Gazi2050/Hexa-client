import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return (
            <div className="flex justify-center items-center p-60">
                <span className="loading loading-spinner loading-lg bg-purple-500"></span>
            </div>)
    }
    if (user) {
        return children;
    }

    return <Navigate to={'/logIn'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;