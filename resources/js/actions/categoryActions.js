import axios from "axios";
import { GET_ALL_CATEGORIES_FAIL, GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS } from "../constants/categoryConstants";

//const CATEGORIES_URL = `${process.env.REACT_APP_API_URL}/api/categories`;
const CATEGORIES_URL = `/api/categories`;

export const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_ALL_CATEGORIES_REQUEST,
        });
        try {
            const { data } = await axios.get(`${CATEGORIES_URL}`);
            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: data,
            });
        } catch (error) {
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
