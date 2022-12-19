import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import modalReducer from "./reducers/modalReducer";
import socialReducer from "./reducers/socialReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        errors: errorReducer,
        modal: modalReducer,
        social: socialReducer
    },
    preloadedState: {}
});

export default store;