import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_GOALS,
    SET_FOLLOWING
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuth: false,
    user: {},
    loading: false
};

function authReducer (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_GOALS:
            return {
                ...state,
                user: {
                    ...state.user,
                    goals: action.payload
                }
            };
        case SET_FOLLOWING:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: action.payload
                }
            }

        default:
            return state;
    }
};

export default authReducer;