import axios from "axios";
import { CLEAR_CART } from "../constants/cartConstants";
import {
    ADD_ORDER_FAIL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

const ORDERS_URL = `/api/orders`;

export const getOrderDetails = (orderID) => {
    return async (dispatch) => {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST,
            payload: orderID,
        });
        try {
            const { data } = await axios.get(
                `${ORDERS_URL}/orderID/${orderID}`
            );
            dispatch({
                type: GET_ORDER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ORDER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const placeOrder = ({ totalPrice }) => {
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_ORDER_REQUEST,
        });
        try {
            const { cartReducer } = getState();
            const { cart } = cartReducer;
            const { data } = await axios.post(`${ORDERS_URL}/add`, {
                order_amount: parseFloat(totalPrice),
                order_items: cart.map((cartItem) => {
                    return {
                        bookID: cartItem.bookID,
                        quantity: cartItem.quantity,
                        price: parseFloat(cartItem.book_price),
                    };
                }),
            });
            dispatch({
                type: ADD_ORDER_SUCCESS,
                payload: data,
            });
            dispatch({
                type: CLEAR_CART,
            });
        } catch (error) {
            dispatch({
                type: ADD_ORDER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};
