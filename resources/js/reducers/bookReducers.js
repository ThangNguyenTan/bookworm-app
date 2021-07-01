import {
    GET_ALL_BOOKS_FAIL,
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_BOOK_DETAILS_FAIL,
    GET_BOOK_DETAILS_REQUEST,
    GET_BOOK_DETAILS_SUCCESS,
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

export const bookDetailsReducer = (
    state = {
        book: null,
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_BOOK_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_BOOK_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                book: action.payload,
            };
        case GET_BOOK_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
