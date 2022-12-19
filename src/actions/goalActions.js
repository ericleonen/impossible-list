import axios from "axios";
import { GET_GOAL_ERRORS, SET_GOALS } from "../actions/types";

// create a new goal
export const createGoal = (userId, title, onClose) => dispatch => {
    axios
        .post("https://impossible-list.onrender.com/api/goals/create", {
            userId,
            title
        })
        .then(res => {
            getGoals(userId)(dispatch);
            onClose();
        })
        .catch(err => 
            dispatch({
                type: GET_GOAL_ERRORS,
                payload: err.response.data
            })
        );
};

export const getGoals = (userId) => dispatch => {
    axios
        .get(`https://impossible-list.onrender.com/api/goals/all/${userId}`)
        .then(({data}) => {
            dispatch({
                type: SET_GOALS,
                payload: data.goals
            });
        })
        .catch(err => console.log(err));
};

export const updateGoal = (userId, index, title, onClose) => dispatch => {
    axios
        .put("https://impossible-list.onrender.com/api/goals/update", {
            userId, 
            index, 
            title
        })
        .then(() => {
            onClose();
            getGoals(userId)(dispatch);
        })
        .catch(err => 
            dispatch({
                type: GET_GOAL_ERRORS,
                payload: err.response.data
            })
        );
};

export const updateGoalCompleted = (userId, index, completed) => dispatch => {
    axios
        .put("https://impossible-list.onrender.com/api/goals/updateCompleted", {
            userId,
            index,
            completed
        })
        .then(res => {
            getGoals(userId)(dispatch);
        })
        .catch(err => console.log(err));
};

export const deleteGoal = (userId, index) => dispatch => {
    axios
        .put("https://impossible-list.onrender.com/api/goals/delete", {
            userId,
            index
        })
        .then(res => {
            getGoals(userId)(dispatch);
        })
        .catch(err => console.log(err));
};