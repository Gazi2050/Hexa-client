import { Helmet } from "react-helmet-async";


const AllUsers = () => {
    return (
        <div>
            <Helmet>
                <title>Hexa | All Users</title>
            </Helmet>
            <h1 className="font-medium text-lg  p-5">All Users</h1>
        </div>
    );
};

export default AllUsers;