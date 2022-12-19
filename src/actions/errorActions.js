import { 
    GET_GOAL_ERRORS, 
    GET_USER_ERRORS 
} from "./types";

export const clearAuthErrors = () => dispatch => {
    dispatch({
        type: GET_USER_ERRORS,
        payload: {}
    })
};

export const clearGoalErrors = () => dispatch => {
    dispatch({
        type: GET_GOAL_ERRORS,
        payload: {}
    })
};