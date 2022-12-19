import { 
    SET_CREATE_GOAL_MODAL,
    SET_UPDATE_GOAL_MODAL
} from "../actions/types";

export const initialUpdateGoal = {
    active: false,
    title: "",
    index: 0
};

const initialState = {
    isCreateGoal: false,
    updateGoal: initialUpdateGoal
};

function modalReducer (state = initialState, action) {
    switch (action.type) {
        case SET_CREATE_GOAL_MODAL:
            return {
                ...state,
                isCreateGoal: action.payload
            };
        case SET_UPDATE_GOAL_MODAL:
            return {
                ...state,
                updateGoal: {
                    ...action.payload
                }
            }     
        default:
            return state;
    }
};

export default modalReducer;