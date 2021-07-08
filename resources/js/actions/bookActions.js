import axios from "axios";
import {
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_BOOKS_FAIL,
    GET_BOOK_DETAILS_REQUEST,
    GET_BOOK_DETAILS_SUCCESS,
    GET_BOOK_DETAILS_FAIL,
    GET_RECOMMENDED_BOOKS_REQUEST,
    GET_RECOMMENDED_BOOKS_SUCCESS,
    GET_RECOMMENDED_BOOKS_FAIL,
    GET_SERVER_BOOKS_SUCCESS,
} from "../constants/bookConstants";

//const BOOKS_URL = `${process.env.REACT_APP_API_URL}/api/books`;
const BOOKS_URL = `/api/books`;

const createSearchBookURL = (searchQueryObj) => {
    //page, page-size, author, category, ratings, sort
    const {
        currentPage,
        pageSize,
        searchedAuthors,
        searchedCategories,
        searchedRating,
        selectedSortCriteria,
    } = searchQueryObj;
    let searchURL = `${BOOKS_URL}/test?page=${currentPage}`;
    searchURL = `${searchURL}&page-size=${pageSize}`;
    searchURL = `${searchURL}&sort=${selectedSortCriteria}`;

    if (searchedAuthors) {
      searchURL = `${searchURL}&author=${searchedAuthors}`;
    }

    if (searchedCategories) {
      searchURL = `${searchURL}&category=${searchedCategories}`;
    }

    if (searchedRating) {
      searchURL = `${searchURL}&ratings=${searchedRating}`;
    }

    return searchURL;
};

export const getAllBooksTest = (searchQueryObj) => {
    return async (dispatch) => {
        dispatch({
            type: GET_ALL_BOOKS_REQUEST,
        });
        try {
            const url = createSearchBookURL(searchQueryObj);
            const { data } = await axios.get(`${url}`);
            dispatch({
                type: GET_SERVER_BOOKS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_BOOKS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const getAllBooks = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_ALL_BOOKS_REQUEST,
        });
        try {
            const { data } = await axios.get(`${BOOKS_URL}`);
            dispatch({
                type: GET_ALL_BOOKS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_BOOKS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const getRecBooks = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_RECOMMENDED_BOOKS_REQUEST,
        });
        try {
            const { data } = await axios.get(`${BOOKS_URL}/rec`);
            dispatch({
                type: GET_RECOMMENDED_BOOKS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_RECOMMENDED_BOOKS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const getBookDetails = (bookID) => {
    return async (dispatch) => {
        dispatch({
            type: GET_BOOK_DETAILS_REQUEST,
            payload: bookID,
        });
        try {
            const { data } = await axios.get(`${BOOKS_URL}/${bookID}`);
            dispatch({
                type: GET_BOOK_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_BOOK_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
