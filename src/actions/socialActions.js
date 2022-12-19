import axios from "axios";
import { GET_SEARCH_USERS, SET_FOLLOWING, SET_VIEW_USER } from "./types";

export const searchUsers = (query, userId) => dispatch => {
    // if no query, clear all searchUsers
    if (query === null || query.length === 0) {
        dispatch({
            type: GET_SEARCH_USERS,
            payload: []
        });
    }
    else {
        axios
            .get(`https://impossible-list.onrender.com/api/users/search?query=${query}&userId=${userId}`)
            .then(res => {
                dispatch({
                    type: GET_SEARCH_USERS,
                    payload: res.data
                });
            })
            .catch(err => console.log(err))
    }
};

export const setViewUser = (id) => dispatch => {
    if (id === null) {
        // if no id, clear viewUser
        dispatch({
            type: SET_VIEW_USER,
            payload: null
        });
    }
    else {
        axios
            .get(`https://impossible-list.onrender.com/api/users/${id}`)
            .then(res => {
                dispatch({
                    type: SET_VIEW_USER,
                    payload: res.data
                });
            })
            .catch(err => console.log(err))
    }
};

export const followUser = (userId, id) => dispatch => {
    axios
        .put("https://impossible-list.onrender.com/api/users/follow", {
            userId,
            id
        })
        .then(() => setFollowing(userId)(dispatch))
        .catch(err => console.log(err));
};

export const unfollowUser = (userId, id) => dispatch => {
    axios
        .put("https://impossible-list.onrender.com/api/users/unfollow", {
            userId,
            id
        })
        .then(() => setFollowing(userId)(dispatch))
        .catch(err => console.log(err));
};

export const setFollowing = id => dispatch => {
    axios
        .get(`https://impossible-list.onrender.com/api/users/following/${id}`)
        .then(({data}) => {
            dispatch({
                type: SET_FOLLOWING,
                payload: data.following
            })
        })
        .catch(err => console.log(err))
};