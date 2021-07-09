import {
    GET_ALL_BOOKS_FAIL,
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_BOOK_DETAILS_FAIL,
    GET_BOOK_DETAILS_REQUEST,
    GET_BOOK_DETAILS_SUCCESS,
    GET_RECOMMENDED_BOOKS_FAIL,
    GET_RECOMMENDED_BOOKS_REQUEST,
    GET_RECOMMENDED_BOOKS_SUCCESS,
} from "../constants/bookConstants";
import { paginate } from "../utils/pagination";

export const bookListReducer = (
    state = {
        books: [],
        loading: true,
        pageObject: null,
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
                books: action.payload.data,
                pageObject: paginate(action.payload.total, action.payload.current_page, action.payload.per_page)
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

export const recBookListReducer = (
    state = {
        popularBooks: [],
        onSaleBooks: [],
        highlyRatedBooks: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_RECOMMENDED_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_RECOMMENDED_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                popularBooks: action.payload.popularBooks,
                onSaleBooks: action.payload.onSaleBooks,
                highlyRatedBooks: action.payload.highlyRatedBooks,
            };
        case GET_RECOMMENDED_BOOKS_FAIL:
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
                book: {
                    ...action.payload,
                },
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
