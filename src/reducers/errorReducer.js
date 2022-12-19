import { 
    GET_USER_ERRORS,
    GET_GOAL_ERRORS
} from "../actions/types";

const initialState = {
    auth: {},
    goal: {}
};

function errorReducer (state = initialState, action) {
    switch (action.type) {
        case GET_USER_ERRORS:
            return {
                ...state,
                auth: action.payload
            };
        case GET_GOAL_ERRORS:
            return {
                ...state,
                goal: action.payload
            }
        default:
            return state;
    }
};

export default errorReducer;