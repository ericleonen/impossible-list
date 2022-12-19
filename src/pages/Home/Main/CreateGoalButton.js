import isEmpty from "is-empty";
import { connect } from "react-redux";
import { setCreateGoal } from "../../../actions/modalActions";

const CreateGoalButton = ({ setCreateGoal}) => {
    return (
        <button
            onClick={() => setCreateGoal(true)}
            className="w-full py-2 mt-4 font-semibold text-white transition-all bg-blue-500 rounded-lg hover:shadow-md hover:bg-blue-600"
        >
            + Create a new goal
        </button>
    );
};

export default connect(() => ({}), { setCreateGoal })(CreateGoalButton);