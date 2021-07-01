import {
    ADD_ORDER_FAIL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const orderListReducer = (
    state = {
        orders: [],
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case GET_ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = {
        order: null,
        loading: true,
    },
    action
) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case GET_ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const orderActionReducer = (
    state = {
        loading: false,
        order: null
    },
    action
) => {
    switch (action.type) {
        case ADD_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            };
        case ADD_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
