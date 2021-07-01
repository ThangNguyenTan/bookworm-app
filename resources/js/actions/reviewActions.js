import axios from "axios";
import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    GET_BOOK_REVIEWS_FAIL,
    GET_BOOK_REVIEWS_REQUEST,
    GET_BOOK_REVIEWS_SUCCESS,
} from "../constants/reviewConstants";

const REVIEWS_URL = `/api/reviews`;

export const getReviewsByBookID = (bookID) => {
    return async (dispatch) => {
        dispatch({
            type: GET_BOOK_REVIEWS_REQUEST,
            payload: bookID,
        });
        try {
            const { data } = await axios.get(`${REVIEWS_URL}/bookID/${bookID}`);
            dispatch({
                type: GET_BOOK_REVIEWS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_BOOK_REVIEWS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const addReview = (newReview) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_REVIEW_REQUEST,
            payload: newReview,
        });
        try {
            await axios.post(`${REVIEWS_URL}/add`, {
                ...newReview,
            });
            const { data } = await axios.get(
                `${REVIEWS_URL}/bookID/${newReview.book_id}`
            );
            dispatch({
                type: ADD_REVIEW_SUCCESS,
            });
            dispatch({
                type: GET_BOOK_REVIEWS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ADD_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
