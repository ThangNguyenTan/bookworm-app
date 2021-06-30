import axios from "axios";
import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL
} from "../constants/bookConstants";

//const BOOKS_URL = `${process.env.REACT_APP_API_URL}/api/books`;
const BOOKS_URL = `/api/books`;

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

