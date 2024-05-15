import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        //console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: `${user.name} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })

    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <Helmet>
                <title>Hexa | All Users</title>
            </Helmet>
            <div className="block md:block lg:hidden">
                <h1 className="text-center font-bold text-xl mt-40 -ml-16">Please view on larger devices</h1>
            </div>
            <div className="hidden md:hidden lg:block">
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
                            {isLoading && (
                                <tr>
                                    <td colSpan="4" className="text-center text-purple-500" style={{ fontSize: '18px', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan="4" className="text-red-600 font-bold text-center">
                                        Error fetching users
                                    </td>
                                </tr>
                            )}
                            {users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex justify-between items-center">
                                        {user.role === 'admin' ?
                                            (<div className="btn btn-sm btn-outline text-green-500 text-xl "><FaUserShield /></div>)
                                            :
                                            (<div onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-outline text-purple-500 text-xl"><FaUser /></div>)
                                        }
                                        <div onClick={() => handleDeleteUser(user._id)} className="btn btn-sm btn-outline text-red-600 text-xl"><MdDelete /></div>
                                    </div>
                                </td>
                            </tr>)

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default AllUsers;