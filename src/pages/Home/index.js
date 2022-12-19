import FullPage from "../../components/FullPage";
import CreateGoalModal from "./CreateGoalModal";
import UpdateGoalModal from "./UpdateGoalModal";
import UtilityBar from "./UtilityBar";
import Main from "./Main";
import SocialBar from "./SocialBar";

const Home = () => {
    return (
        <>
            <CreateGoalModal />
            <UpdateGoalModal />
            <FullPage horizontalCenter verticalCenter>
                <div className="flex overflow-hidden bg-gray-100 rounded-lg shadow-md">
                    <UtilityBar />
                    <Main />
                    <SocialBar />
                </div>
            </FullPage>
        </>
    );
};

export default Home;