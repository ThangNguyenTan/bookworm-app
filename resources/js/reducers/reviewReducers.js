import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    GET_BOOK_REVIEWS_FAIL,
    GET_BOOK_REVIEWS_REQUEST,
    GET_BOOK_REVIEWS_SUCCESS,
    SET_REVIEWS_SEARCH_OBJECT,
} from "../constants/reviewConstants";
import { paginate } from "../utils/pagination";

export const reviewSearchObjectReducer = (state = {
    searchObject: {}
}, action) => {
    switch (action.type) {
        case SET_REVIEWS_SEARCH_OBJECT:
            return {
                ...state,
                searchObject: action.payload
            };
        default:
            return state;
    }
}

export const reviewListReducer = (
    state = {
        reviews: [],
        reviewsStatus: null,
        pageObject: null,
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
                reviews: action.payload.reviews.data,
                reviewsStatus: action.payload.reviewsStatus[0],
                pageObject: paginate(action.payload.reviews.total, action.payload.reviews.current_page, action.payload.reviews.per_page)
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
