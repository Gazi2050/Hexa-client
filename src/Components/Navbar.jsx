import { MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { HiRectangleStack } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
const Navbar = () => {
    return (
        <div>
            {/* for tab and laptop */}
            <div className="hidden md:block lg:block">
                <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-black border-r border-purple-500 rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                    <Link to={'/'} className="mx-auto">
                        <img className="w-auto h-12 " src="src/assets/logo.png" alt="logo" />
                    </Link>
                    <div className="flex flex-col items-center mt-6 -mx-2">
                        <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                        <h4 className="mx-2 mt-2 font-medium text-white dark:text-gray-200">John Doe</h4>
                        <p className="mx-2 mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">john@example.com</p>
                    </div>

                    <div className="flex flex-col flex-1 mt-6">
                        <nav>
                            <NavLink to={'/'} className="flex items-center px-4 py-2 mt-5 text-purple-500 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <BiSolidDashboard className="w-5 h-5" />

                                <span className="mx-4 font-medium">Dashboard</span>
                            </NavLink>

                            <NavLink to={'/accounts'} className="flex items-center px-4 py-2 mt-5 text-purple-500  transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <FaUser className="w-5 h-5" />

                                <span className="mx-4 font-medium">Accounts</span>
                            </NavLink>

                            <NavLink to={'/myBlogs'} className="flex items-center px-4 py-2 mt-5 text-purple-500  transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <BsFillPostcardFill className="w-5 h-5" />

                                <span className="mx-4 font-medium">My blogs</span>
                            </NavLink>

                            <NavLink to={'/createBlog'} className="flex items-center px-4 py-2 mt-5 text-purple-500  transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <FaCirclePlus className="w-5 h-5" />

                                <span className="mx-4 font-medium">Create Blog</span>
                            </NavLink>
                            <NavLink to={'/allBlogs'} className="flex items-center px-4 py-2 mt-5 text-purple-500  transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <HiRectangleStack className="w-5 h-5" />

                                <span className="mx-4 font-medium">All Blogs</span>
                            </NavLink>
                            <NavLink to={'/allUsers'} className="flex items-center px-4 py-2 mt-5 text-purple-500  transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 active:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">
                                <FaUsers className="w-5 h-5" />

                                <span className="mx-4 font-medium">All Users</span>
                            </NavLink>

                        </nav>
                    </div>
                </aside>
            </div>
            {/* for mobile */}
            <div className="block md:hidden lg:hidden ">
                <div className="drawer ">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn drawer-button border-0 btn-sm bg-black"><MdMenu className="text-2xl text-purple-500" /></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-[70%] min-h-full bg-black  text-purple-500 font-medium  border-purple-500 border-2 border-r border-l-0 border-t-0 border-b-0">
                            {/* Sidebar content here */}
                            <Link to={'/'} className="mx-auto">
                                <img className="w-auto h-9 " src="src/assets/logo.png" alt="logo" />
                            </Link>
                            <div className="flex flex-col items-center mt-6 -mx-2 mb-4">
                                <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                                <h4 className="mx-2 mt-2 font-medium text-white dark:text-gray-200">John Doe</h4>
                                <p className="mx-2 mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">john@example.com</p>
                            </div>
                            <li><NavLink to={'/'}><BiSolidDashboard className="w-5 h-5" />Dashboard</NavLink></li>
                            <li><NavLink to={'/accounts'}><FaUser className="w-5 h-5" />Accounts</NavLink></li>
                            <li><NavLink to={'/myBlogs'}><BsFillPostcardFill className="w-5 h-5" />My blogs</NavLink></li>
                            <li><NavLink to={'/createBlog'}><FaCirclePlus className="w-5 h-5" />Create Blog</NavLink></li>
                            <li><NavLink to={'/allBlogs'}><HiRectangleStack className="w-5 h-5" />All Blogs</NavLink></li>
                            <li><NavLink to={'/allUsers'}><FaUsers className="w-5 h-5" />All Users</NavLink></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;