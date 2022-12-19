import { connect } from "react-redux";
import Goal from "./Goal";
import { useEffect } from "react";
import { getGoals } from "../../../../actions/goalActions";
import isEmpty from "is-empty";

const GoalList = ({ goals, userId, isSocial, getGoals }) => {
    useEffect(() => {
        if (!isSocial && userId) {
            getGoals(userId);
        }
    }, [userId, isSocial, getGoals]);

    return (
        <div className="h-[30rem] w-full overflow-y-scroll py-3">
            {
                goals && goals.map((goal, index) => {
                    return <Goal 
                                title={goal.title}
                                key={`goal_${index}`}
                                index={index}
                                goalCompleted={goal.completed}
                            />
                })
            }
        </div>
    );
};

const mapStateToProps = state => ({
    goals: isEmpty(state.social.viewUser) ? state.auth.user.goals : state.social.viewUser.goals,
    userId: state.auth.user.id,
    isSocial: !isEmpty(state.social.viewUser)
});

export default connect(mapStateToProps, { getGoals })(GoalList);