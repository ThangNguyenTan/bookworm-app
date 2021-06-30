import {
    GET_ALL_BOOKS_FAIL,
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
} from "../constants/bookConstants";

export const bookListReducer = (
    state = {
        books: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload,
            };
        case GET_ALL_BOOKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
