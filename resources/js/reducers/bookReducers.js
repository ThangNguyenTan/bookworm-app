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
import { calculateDiscountPrice, calculateRatings } from "../utils/calculation";

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
                books: action.payload.map((bookItem) => {
                    return {
                        ...bookItem,
                        ratings: calculateRatings(bookItem.reviews).ratings,
                        discount_price: calculateDiscountPrice(bookItem),
                    };
                }),
            };
        /*
        case GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload.data,
                pageObject: action.payload.pageObject
            };
        */
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
                    discount_price: calculateDiscountPrice(action.payload),
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
