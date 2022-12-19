import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { clearAuthErrors } from "./errorActions";

import {
    GET_USER_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";
import { setViewUser } from "./socialActions";

// register user
export const registerUser = (userData, navigate) => dispatch => {
    axios
        .post("http://localhost:5000/api/users/register", userData)
        .then(res => navigate("/login"))
        .then(() => {
            clearAuthErrors()(dispatch);
        })
        .catch(err => 
            dispatch({
                type: GET_USER_ERRORS,
                payload: err.response.data
            })
        );
};

// login: get user token
export const loginUser = userData => dispatch => {
    axios
        .post("http://localhost:5000/api/users/login", userData)
        .then(res => {
            // save to local storage

            // set token to local storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // set token to auth header
            setAuthToken(token);

            // decode token to get user data
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .then(() => {
            clearAuthErrors()(dispatch);
        })
        .catch(err =>
            dispatch({
                type: GET_USER_ERRORS,
                payload: err.response.data
            })    
        );
};

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// log user out
export const logoutUser = (navigate) => dispatch => {
    // remove token from local storage
    localStorage.removeItem("jwtToken");

    // remove auth header for future requests
    setAuthToken(false);

    // set current user to empty object {} which will set isAuth to false
    dispatch(setCurrentUser({}));
    setViewUser(null)(dispatch);
    
};