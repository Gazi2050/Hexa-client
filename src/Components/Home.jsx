import { Helmet } from "react-helmet-async";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hexa | Dashboard</title>
            </Helmet>
            <h1 className="font-medium text-lg  p-5">Dashboard</h1>
        </div>
    );
};

export default Home;