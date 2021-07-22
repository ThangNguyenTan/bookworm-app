import axios from "axios";
import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,
    GET_ALL_AUTHORS_REQUEST,
    GET_ALL_AUTHORS_SUCCESS,
    GET_ALL_AUTHORS_FAIL,
} from "../constants";

const MAIN_URL = `/api/main`;

export const getShopFilters = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_ALL_AUTHORS_REQUEST,
        });
        dispatch({
            type: GET_ALL_CATEGORIES_REQUEST,
        });
        try {
            const { data } = await axios.get(`${MAIN_URL}/filters`);
            dispatch({
                type: GET_ALL_AUTHORS_SUCCESS,
                payload: data.authors,
            });
            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: data.categories,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_AUTHORS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
            dispatch({
                type: GET_ALL_CATEGORIES_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
