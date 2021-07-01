import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    GET_BOOK_REVIEWS_FAIL,
    GET_BOOK_REVIEWS_REQUEST,
    GET_BOOK_REVIEWS_SUCCESS,
} from "../constants/reviewConstants";

export const reviewListReducer = (
    state = {
        reviews: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_BOOK_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_BOOK_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };
        case GET_BOOK_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const reviewActionReducer = (
    state = {
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
