import axios from "axios";
import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    GET_BOOK_REVIEWS_FAIL,
    GET_BOOK_REVIEWS_REQUEST,
    GET_BOOK_REVIEWS_SUCCESS,
    SET_REVIEWS_SEARCH_OBJECT,
} from "../constants";

//const REVIEWS_URL = `/api/reviews`;
const BOOKS_URL = `/api/books`;

const createSearchReviewURL = (bookID, searchQueryObj) => {
    //page, page-size, author, category, ratings, sort
    const {
        currentPage,
        pageSize,
        selectedSortCriteria,
        searchedRating
    } = searchQueryObj;
    let searchURL = `${BOOKS_URL}/${bookID}/reviews?page=${currentPage}`;
    searchURL = `${searchURL}&page-size=${pageSize}`;
    searchURL = `${searchURL}&ratings=${searchedRating}`;
    searchURL = `${searchURL}&sort=${selectedSortCriteria}`;

    return searchURL;
};

export const getReviewsByBookID = (bookID, searchQueryObj) => {
    return async (dispatch) => {
        dispatch({
            type: GET_BOOK_REVIEWS_REQUEST,
            payload: bookID,
        });
        try {
            const url = createSearchReviewURL(bookID, searchQueryObj);
            const { data } = await axios.get(`${url}`);
            dispatch({
                type: SET_REVIEWS_SEARCH_OBJECT,
                payload: searchQueryObj
            })
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
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_REVIEW_REQUEST,
            payload: newReview,
        });

        const { reviewSearchObjectReducer } = getState();
        const { searchObject } = reviewSearchObjectReducer;

        try {
            await axios.post(`${BOOKS_URL}/${newReview.book_id}/review`, {
                ...newReview,
            });
            const url = createSearchReviewURL(newReview.book_id, searchObject);
            const { data } = await axios.get(`${url}`);
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
