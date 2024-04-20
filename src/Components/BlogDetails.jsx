import { useLoaderData } from "react-router-dom";


const BlogDetails = () => {
    const blog = useLoaderData();

    return (
        <div>
            <div>
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
        </div>
    );
};

export default BlogDetails;