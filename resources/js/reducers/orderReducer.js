import {
    ADD_ORDER_FAIL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

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
