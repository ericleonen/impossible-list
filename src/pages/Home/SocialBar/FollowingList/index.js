import { useEffect } from "react";
import { connect } from "react-redux";
import { setFollowing } from "../../../../actions/socialActions";
import Following from "./Following";

const FollowingList = ({ userId, following, setFollowing }) => {
    useEffect(() => {
        if (userId) {
            setFollowing(userId);
        }
    }, [userId, setFollowing]);

    if (following && following.length > 0) {
        return (
            <div className="h-full px-3 mt-8">
                <p className="font-semibold text-blue-500">Following</p>
                <div className="h-full px-1 overflow-y-scroll">
                    {
                        following.map((follower, index) => {
                            return <Following 
                                        name={follower.name}
                                        id={follower.id}
                                        key={`following_${index}`}
                                    />
                        })
                    }
                </div>
            </div>
        );
    }

    return null;
};

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    following: state.auth.user.following
});

export default connect(mapStateToProps, { setFollowing })(FollowingList);