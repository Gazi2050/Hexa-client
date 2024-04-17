import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Hexa | All Users</title>
            </Helmet>
            <div className="ml-40 w-full -mt-5">
                <p className="text-center text-4xl font-semibold mb-2">All Users</p>
                <p className="text-xl font-bold my-1">Total Users: <span>{users.length}</span></p>
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-black text-white ">
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex justify-between items-center">
                                        <div className="btn btn-sm btn-outline text-purple-500 text-xl"><FaUser /></div>
                                        <div className="btn btn-sm btn-outline text-red-600 text-xl"><MdDelete /></div>
                                    </div>
                                </td>
                            </tr>)

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;