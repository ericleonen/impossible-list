import axios from "axios";
import { GET_GOAL_ERRORS, SET_GOALS } from "../actions/types";

// create a new goal
export const createGoal = (userId, title, onClose) => dispatch => {
    axios
        .post("http://localhost:5000/api/goals/create", {
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
        .get(`http://localhost:5000/api/goals/all/${userId}`)
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
        .put("http://localhost:5000/api/goals/update", {
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
        .put("http://localhost:5000/api/goals/updateCompleted", {
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
        .put("http://localhost:5000/api/goals/delete", {
            userId,
            index
        })
        .then(res => {
            getGoals(userId)(dispatch);
        })
        .catch(err => console.log(err));
};