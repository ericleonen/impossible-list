import { FaCopy, FaEllipsisH } from 'react-icons/fa';
import { setUpdateGoal } from '../../../../actions/modalActions';
import { connect } from 'react-redux';
import { createGoal, updateGoalCompleted } from '../../../../actions/goalActions';
import isEmpty from 'is-empty';
import { useState } from 'react';

const Goal = ({ userId, title, index, setUpdateGoal, updateGoalCompleted, goalCompleted, isSocial, createGoal }) => {
    const onComplete = () => {
        // prevent goal completion if you are just viewing
        if (!isSocial) {
            updateGoalCompleted(userId, index, true);
        }
    };

    const onUncomplete = () => {
        // prevent goal uncompletion if you are just viewing
        if (!isSocial) {
            updateGoalCompleted(userId, index, false);
        }
    };

    const onClick = () => {
        setUpdateGoal({
            active: true,
            index,
            title
        });
    };

    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        // add goal to user's list
        if (!copied) {
            createGoal(userId, title);
            setCopied(true);
        }
    };

    return (
        <div className="flex items-center w-full px-8 transition-all hover:bg-gray-100">
            <div className="p-3">
                {
                    goalCompleted ? 
                    <button 
                        onClick={onUncomplete}
                        className="w-6 h-6 transition-all bg-blue-400 border-4 border-blue-500 rounded-full hover:bg-blue-300" 
                    />
                    :
                    <button 
                        onClick={onComplete}
                        className="w-6 h-6 transition-all border-4 border-blue-500 rounded-full hover:bg-blue-200" 
                    />
                }
            </div>
            <p className={"font-semibold text-md" + (goalCompleted ? " line-through text-gray-400" : " ")}>{ title }</p>
            {
                isSocial ?
                <button 
                    onClick={onCopy}
                    className="px-2 py-1 ml-auto text-sm text-gray-400 rounded-full hover:bg-gray-200"
                >
                    { copied ? "COPIED" : <FaCopy /> }
                </button>
                :
                <button 
                    onClick={onClick}
                    className="px-2 py-1 ml-auto text-sm text-gray-400 rounded-full hover:bg-gray-200"
                >
                    <FaEllipsisH />
                </button>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    isSocial: !isEmpty(state.social.viewUser)
});

export default connect(mapStateToProps, { setUpdateGoal, updateGoalCompleted, createGoal })(Goal);