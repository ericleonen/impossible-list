import isEmpty from "is-empty";
import { connect } from "react-redux";
import CreateGoalButton from "./CreateGoalButton";
import FollowButton from "./FollowButton";
import GoalList from "./GoalList";

const Main = ({ name, socialName, isSocial }) => {
    return (
        <div className="overflow-hidden bg-white shadow-md">
            <div className="px-12 py-8 shadow-md">
                <p className="text-xs font-semibold">{ isSocial ? "VIEWING" : "HOME" }</p>
                <p className="text-3xl font-semibold">{ socialName || name }'s Impossible List</p>
                { 
                    isSocial ? 
                    <FollowButton /> 
                    : 
                    <CreateGoalButton /> }
            </div>
            <GoalList />
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.auth.user.name,
    socialName: isEmpty(state.social.viewUser) ? null : state.social.viewUser.name,
    isSocial: !isEmpty(state.social.viewUser)
});

export default connect(mapStateToProps, {})(Main);