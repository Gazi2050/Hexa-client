import { useLoaderData } from "react-router-dom";


const BlogDetails = () => {
    const blog = useLoaderData();

    return (
        <div>
            {/* for laptop */}
            <div className="hidden md:hidden lg:block">
                <section className="bg-zinc-800 ">
                    <div className="container px-6 py-5 mx-auto">
                        <div className="mt-8 lg:-mx-6 ">
                            <div className="flex justify-center">
                                <img className="object-cover  lg:w-[95%] rounded-xl h-72 lg:h-96 shadow-md shadow-purple-500" src={blog.img} alt="" />

                            </div>
                            <div className=" flex justify-center mx-6">
                                <div className="mt-6">

                                    <h1 className="block mt-4 text-2xl font-semibold text-white">
                                        {blog.title}
                                    </h1>
                                    {blog.dateTime ? (
                                        <p className="text-sm text-slate-600">{blog.dateTime}</p>
                                    ) : (
                                        <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                                    )}
                                    <p className="mt-3 text-lg text-gray-500">
                                        {blog.description}
                                    </p>
                                    <div className="mt-6">
                                        <div>
                                            <p className="text-sm font-semibold text-purple-500">{blog.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/*  */}
            <div className="hidden md:block lg:hidden">
                <div className="flex justify-center items-center ml-24 ">
                    <img className="w-[450px] h-[300px] rounded-md  shadow-md shadow-purple-600" src={blog.img} alt="img" />
                </div>
                <div className="ml-28">
                    <h1 className="block mt-4 text-2xl font-semibold text-white">
                        {blog.title}
                    </h1>
                    {blog.dateTime ? (
                        <p className="text-sm text-slate-600 mt-1">{blog.dateTime}</p>
                    ) : (
                        <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                    )}
                    <p className="mt-3 text-lg text-gray-500">
                        {blog.description}
                    </p>
                    <div className="mt-6">
                        <div>
                            <p className="text-sm font-semibold text-purple-500">{blog.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* for mobile */}
            <div className="block md:hidden lg:hidden">
                <div className="flex justify-center items-center -ml-20 mt-10 px-10 ">
                    <img className="w-full rounded-md mt-4 shadow-md shadow-purple-600" src={blog.img} alt="img" />
                </div>
                <div className="-ml-10">
                    <h1 className="block mt-4 text-2xl font-semibold text-white">
                        {blog.title}
                    </h1>
                    {blog.dateTime ? (
                        <p className="text-sm text-slate-600 mt-1">{blog.dateTime}</p>
                    ) : (
                        <p className="text-sm text-slate-600">Updated on {blog.updateTime}</p>
                    )}
                    <p className="mt-3 text-lg text-gray-500">
                        {blog.description}
                    </p>
                    <div className="mt-6">
                        <div>
                            <p className="text-sm font-semibold text-purple-500">{blog.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;