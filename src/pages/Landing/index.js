import { connect } from "react-redux";
import FullPage from "../../components/FullPage";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import doingImg from "../../images/doing.png";
import sharingImg from "../../images/sharing.png";

const Landing = ({ isAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth, navigate]);

    return (
        <FullPage>
            <NavBar />
            <div className="flex flex-col items-center w-full h-full py-20 overflow-y-scroll">
                <p className="font-semibold text-7xl">Do the <span className="text-blue-500">impossible</span></p>
                <div className="flex items-center p-10 bg-white rounded-lg shadow-lg w-[80%] mt-20">
                    <div className="p-2 bg-gray-200 rounded-lg shadow-md">
                        <img src={doingImg} className="h-[30rem]" alt="app main page"/>
                    </div>
                    <div className="max-w-[25rem] pl-8 ml-4">
                        <p className="text-4xl font-semibold">Write goals down. <br /> Get them done.</p>
                        <p className="mt-5 text-xl text-gray-500">Write down you biggest, most ambitious life goals on your <span className="text-blue-500">Impossible List</span>. Complete, update, and delete goals as necessary with a super-simple UI. <br /><br />Remember, with a clear vision, anything is possible.</p>
                    </div>
                </div>
                <div className="flex items-center p-10 bg-white rounded-lg shadow-lg w-[80%] mt-20">
                    <div className="max-w-[25rem] pr-8 mx-4 text-right">
                        <p className="text-4xl font-semibold">Share your progress. <br /> Copy your friends.</p>
                        <p className="mt-5 text-xl text-gray-500">Anyone can find your profile through the search bar to watch you complete your life's goals. Follow your friends to get inspired and copy goals. <br/><br/>Impossible goals are a lot less impossible with the support of your friends.</p>
                    </div>
                    <div className="p-2 bg-gray-200 rounded-lg shadow-md">
                        <img src={sharingImg} className="h-[30rem]" alt="app social page"/>
                    </div>
                </div>
            </div>
        </FullPage>
    );
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Landing);