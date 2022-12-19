import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../../actions/socialActions";
import isEmpty from "is-empty";

const FollowButton = ({ userId, id, isFollowing, followUser, unfollowUser }) => {
    if (isFollowing) {
        return (
            <button
                onClick={() => unfollowUser(userId, id)}
                className="w-full py-2 mt-4 font-semibold text-white transition-all bg-blue-500 border-2 border-blue-500 rounded-lg hover:shadow-md"
            >
                Following
            </button>
        );
    }
    
    return (
        <button
            onClick={() => followUser(userId, id)}
            className="w-full py-2 mt-4 font-semibold text-blue-500 transition-all border-2 border-blue-500 rounded-lg hover:shadow-md"
        >
            Follow
        </button>
    );
};

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    id: state.social.viewUser._id,
    isFollowing: state.auth.user.following && !isEmpty(state.social.viewUser._id) ? state.auth.user.following.some(x => x.id === state.social.viewUser._id) : null
});

export default connect(mapStateToProps, { followUser, unfollowUser })(FollowButton);