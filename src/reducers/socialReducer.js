import { 
    GET_SEARCH_USERS, 
    SET_VIEW_USER 
} from "../actions/types";

const initialState = {
    viewUser: {},
    searchUsers: []
};

function socialReducer (state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH_USERS:
            return {
                ...state,
                searchUsers: action.payload
            };
        case SET_VIEW_USER:
            return {
                ...state,
                viewUser: action.payload
            };
        default:
            return state;
    }
};

export default socialReducer;