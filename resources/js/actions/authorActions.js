import axios from "axios";
import {
    GET_ALL_AUTHORS_FAIL,
    GET_ALL_AUTHORS_REQUEST,
    GET_ALL_AUTHORS_SUCCESS,
} from "../constants";

//const AUTHORS_URL = `${process.env.REACT_APP_API_URL}/api/authors`;
const AUTHORS_URL = `/api/authors`;

export const getAllAuthors = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_ALL_AUTHORS_REQUEST,
        });
        try {
            const { data } = await axios.get(`${AUTHORS_URL}`);
            dispatch({
                type: GET_ALL_AUTHORS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_AUTHORS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
