import { 
    SET_CREATE_GOAL_MODAL,
    SET_UPDATE_GOAL_MODAL
} from "./types";

export const setCreateGoal = active => dispatch => {
    dispatch({
        type: SET_CREATE_GOAL_MODAL,
        payload: active
    });
};

export const setUpdateGoal = payload => dispatch => {
    dispatch({
        type: SET_UPDATE_GOAL_MODAL,
        payload
    });
};